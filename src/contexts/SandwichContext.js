import React, { createContext, useContext, useMemo } from 'react';

import { useAsyncCallback } from '../utils';

const SandwichContext = createContext();

export const SandwichProvider = ({ children, layersState }) => {
  const context = useMemo(() => ({
    layersState,
  }), [...layersState]);

  return (
    <SandwichContext.Provider value={context}>
      <Children context={context}>{children}</Children>
    </SandwichContext.Provider>
  );
};

const Children = ({ children, context }) => {
  if (typeof children == 'function') {
    return children(context);
  }

  return children;
};

export const usePushLayer = () => {
  const { createLayer } = require('../components/Layer');

  const { layersState: [layers, setLayers] } = useContext(SandwichContext);

  const pushLayer = useAsyncCallback(function* (children, { keyframes, timing } = {}) {
    const currLayer = createLayer(children, layers.length, { keyframes, timing });

    // Might have been popped by someone else
    setLayers((layers) => {
      return [...layers, currLayer];
    });

    yield* currLayer.transitionIn();
  }, [layers]);

  return pushLayer;
};

export const usePopLayer = () => {
  const { layersState: [layers, setLayers] } = useContext(SandwichContext);

  const popLayer = useAsyncCallback(function* ({ keyframes, timing } = {}) {
    const currLayer = layers[layers.length - 1];

    yield* currLayer.transitionOut(keyframes, timing);

    // Might have been popped by someone else
    setLayers((layers) => {
      const currLayerIndex = layers.indexOf(currLayer);

      return ~currLayerIndex ? [...layers.slice(0, currLayerIndex), ...layers.slice(currLayerIndex + 1)] : layers;
    });
  }, [layers]);

  return popLayer;
};
