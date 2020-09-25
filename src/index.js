export * from './contexts/LayerContext';
export * from './contexts/SandwichContext';

import React, { useMemo, useState } from 'react';

import { SandwichProvider } from './contexts/SandwichContext';

const Sandwich = ({ style, className, children }) => {
  const layersState = useState([]);
  const [layers] = layersState;
  const sandwich = layers.map(layer => layer.render());

  useMemo(() => {
    let styleEl = document.getElementById('rsn-style');

    if (styleEl) {
      return;
    }

    styleEl = document.createElement('style');
    styleEl.id = 'rsn-style';
    styleEl.innerHTML = `
      .rsn-stack {
        position: relative;
        width: 100%;
        height: 100%;
      }

      .rsn-layer {
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        position: absolute;
      }

      .rsn-mask {
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
    <SandwichProvider layersState={layersState}>
      <div style={style} className={['rsn-stack', className].filter(Boolean)}>
        {typeof children == 'function' ? children(sandwich) : sandwich}
      </div>
    </SandwichProvider>
  );
};

export default Sandwich;
