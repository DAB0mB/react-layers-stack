import React, { createRef, forwardRef } from 'react';

import { LayerProvider } from '../contexts/LayerContext';
import { nextFrame } from '../utils';

const Layer = forwardRef((props, ref) => {
  return (
    <div ref={ref} {...props} className={['rls-layer', props.className].filter(Boolean)} />
  );
});

Layer.displayName = 'Layer';

export const createLayer = (children, { keyframes, mask, timing } = {}) => {
  const layerRef = createRef();
  const maskRef = createRef();
  const childrenRef = createRef();
  const key = Date.now();

  const listeners = {
    willFocus: [],
    didFocus: [],
    willBlur: [],
    didBlur: [],
  };

  const render = (props) => (
    <React.Fragment key={key}>
      <div className='rls-mask' ref={maskRef} />
      <LayerProvider listeners={listeners}>
        <Layer ref={layer => layerRef.current = layer}>
          {childrenRef.current = childrenRef.current ?? React.cloneElement(children, props)}
        </Layer>
      </LayerProvider>
    </React.Fragment>
  );

  const transition = function* ({ direction, keyframes, mask = {}, timing }) {
    const resolutions = [];

    {
      const layerEl = layerRef.current;

      const animation = layerEl.animate(keyframes, {
        ...timing,
        direction,
        fill: 'forwards',
      });

      resolutions.push(new Promise(resolve => animation.onfinish = resolve));
    }

    {
      const maskEl = maskRef.current;

      const keyframes = [
        { ...mask, opacity: 0 },
        { ...mask, opacity: mask.opacity ?? .5 },
      ];

      const animation = maskEl.animate(keyframes, {
        ...timing,
        direction,
        fill: 'forwards',
      });

      resolutions.push(new Promise(resolve => animation.onfinish = resolve));
    }

    yield Promise.all(resolutions);
  };

  const transitionOut = function* (prevLayer, args = {}) {
    // Waiting for listeners and refs to be registered
    yield nextFrame();

    listeners.willBlur.forEach(listener => listener());
    prevLayer?.listeners.willFocus.forEach(listener => listener());

    yield* transition({
      direction: args.direction ?? 'reverse',
      keyframes: args.keyframes ?? keyframes,
      timing: args.timing ?? timing,
      mask: args.mask ?? mask,
    });

    listeners.didBlur.forEach(listener => listener());
    prevLayer?.listeners.didFocus.forEach(listener => listener());
  };

  const transitionIn = function* (prevLayer, args = {}) {
    // Waiting for listeners and refs to be registered
    yield nextFrame();

    prevLayer?.listeners.willBlur.forEach(listener => listener());
    listeners.willFocus.forEach(listener => listener());

    yield* transition({
      direction: args.direction ?? 'normal',
      keyframes: args.keyframes ?? keyframes,
      timing: args.timing ?? timing,
      mask: args.mask ?? mask,
    });

    prevLayer?.listeners.didBlur.forEach(listener => listener());
    listeners.didFocus.forEach(listener => listener());
  };

  return {
    render,
    listeners,
    transitionIn,
    transitionOut,
  };
};

export default Layer;
