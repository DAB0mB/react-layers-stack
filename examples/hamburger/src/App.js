import './App.css';

import React, { useCallback, useState } from 'react';
import { createLayer, usePushLayer, Stack } from 'react-layers-stack';

const App = () => {
  return (
    <div className='App'>
      <TabsMenu />
    </div>
  );
};

const renderTab = ({ layerIndex }) => (
  <div style={{ background: 'pink', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
    Page {layerIndex}
  </div>
);

const TabsMenu = () => {
  const [layers, setLayers] = useState([
    createLayer(renderTab({ layerIndex: 1 })),
  ]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ flex: .15, background: 'lightblue', padding: 20 }}>header</div>
      <div style={{ flex: .85, overflow: 'hidden' }}>
        <Stack layersState={[layers, setLayers]}>
          {stack => {
            const [layerIndex, setLayerIndex] = useState(1);
            const pushLayer = usePushLayer();

            const handleClick = useCallback(() => {
              switch (layerIndex) {
              case 3:

              default:
                setLayerIndex(i => ++i);

                return pushLayer(renderTab({ layerIndex: layerIndex + 1 }), {
                  keyframes: [
                    { width: '100%', left: 'auto', right: '-100%' },
                    { width: '100%', left: 'auto', right: '0' },
                  ],
                  timing: {
                    duration: 500,
                  },
                  mask: {
                    background: '#000',
                  },
                });
              }
            }, [layerIndex, pushLayer]);

            return (
              <span onClick={handleClick}>
                {stack}
              </span>
            );
          }}
        </Stack>
      </div>
    </div>
  );
};

export default App;
