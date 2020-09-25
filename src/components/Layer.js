import React, { createRef, forwardRef } from 'react';

import { LayerProvider } from '../contexts/LayerContext';
import { nextFrame } from '../utils';

const Layer = forwardRef((props, ref) => {
  return (
    <div ref={ref} {...props} className={['rsn-layer', props.className].filter(Boolean)} />
  );
});

Layer.displayName = 'Layer';

export const createLayer = (children, index, { keyframes, overlay, timing } = {}) => {
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
      <div className='rsn-mask' ref={maskRef} />
      <LayerProvider listeners={listeners}>
        <Layer ref={layer => layerRef.current = layer}>
          {childrenRef.current = childrenRef.current ?? React.cloneElement(children, props)}
        </Layer>
      </LayerProvider>
    </React.Fragment>
  );

  const transition = function* ({ direction, keyframes, overlay = {}, timing }) {
    const resolutions = [];

    {
      const layer = layerRef.current;

      const animation = layer.animate(keyframes, {
        ...timing,
        direction,
        fill: 'forwards',
      });

      resolutions.push(new Promise(resolve => animation.onfinish = resolve));
    }

    {
      const mask = maskRef.current;

      const keyframes = [
        { ...overlay, opacity: 0 },
        { ...overlay, opacity: overlay.opacity ?? .5 },
      ];

      const animation = mask.animate(keyframes, {
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
      overlay: args.overlay ?? overlay,
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
      overlay: args.overlay ?? overlay,
    });

    prevLayer?.listeners.didBlur.forEach(listener => listener());
    listeners.didFocus.forEach(listener => listener());
  };

  return {
    render,
    transitionIn,
    transitionOut,
  };
};

export default Layer;
