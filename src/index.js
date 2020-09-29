export * from './contexts/LayerContext';
export * from './contexts/StackContext';
export * from './components/Layer';

import React, { useMemo, useState } from 'react';

import { StackProvider } from './contexts/StackContext';

export const Stack = ({ layersState, style, className, children }) => {
  const [layers, setLayers] = layersState ?? useState([]);

  useMemo(() => {
    let styleEl = document.getElementById('rls-style');

    if (styleEl) {
      return;
    }

    styleEl = document.createElement('style');
    styleEl.id = 'rls-style';
    styleEl.innerHTML = `
      .rls-stack {
        position: relative;
        width: 100%;
        height: 100%;
      }

      .rls-layer {
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        position: absolute;
      }

      .rls-mask {
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        position: absolute;
      }
    `;

    document.head.append(styleEl);
  }, []);

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
