import React, { createContext, useMemo } from 'react';

import { StackContext } from '../contexts/StackContext';
import { useAsyncCallback } from '../utils';

const StackContext = createContext();

export const StackProvider = ({ layersState }) => {
  const context = useMemo(() => ({
    layersState,
  }), [...layersState]);

  return (
    <StackContext.Provider value={context}>
      <Children context={context}>{children}</Children>
    </StackContext.Provider>
  );
};

const Children = ({ children, context }) => {
  if (typeof children == 'function') {
    return children(context);
  }

  return children;
};

export const usePushLayer = () => {
  const { createLayer } = require('./components/Layer');

  const { layersState: [layers, setLayers] } = useContext(StackContext);

  const pushLayer = useAsyncCallback(function* (children, { keyframes, timing } = {}) {
    const currLayer = createLayer(children, layers.length, { keyframes, timing });
    const prevLayer = layers[layers.length - 1];

    // Might have been popped by someone else
    setLayers((layers) => {
      return [...layers, currLayer];
    });

    yield* currLayer.transitionIn(prevLayer);
  }, [layers]);

  return pushLayer;
};

export const usePopLayer = () => {
  const { layersState: [layers, setLayers] } = useContext(StackContext);

  const popLayer = useAsyncCallback(function* ({ keyframes, timing } = {}) {
    const currLayer = layers[layers.length - 1];
    const prevLayer = layers[layers.length - 2];

    yield* currLayer.transitionOut(prevLayer, { keyframes, timing });

    // Might have been popped by someone else
    setLayers((layers) => {
      const currLayerIndex = layers.indexOf(currLayer);

      return ~currLayerIndex ? [...layers.slice(0, currLayerIndex), ...layers.slice(currLayerIndex + 1)] : layers;
    });
  }, [layers]);

  return popLayer;
};
