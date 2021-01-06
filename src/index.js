export * from './contexts/LayerContext';
export * from './contexts/StackContext';
export * from './components/Layer';

import React, { useState } from 'react';

import { StackProvider } from './contexts/StackContext';

export const Stack = ({ layersState, style, className, children }) => {
  const [layers, setLayers] = layersState ?? useState([]);

  return (
    <StackProvider layersState={[layers, setLayers]}>
      {stack => (
        <div style={style} className={['rls-stack', className].filter(Boolean).join(' ')}>
          {typeof children == 'function' ? children(stack) : stack}
        </div>
      )}
    </StackProvider>
  );
};

export default Stack;
