import './App.css';

import React, { useCallback, useEffect, useState } from 'react';
import { createLayer, usePushLayer, Stack } from 'react-layers-stack';

const App = () => {
  const [layerIndex, setLayerIndex] = useState(0);

  const handleTabMaxout = useCallback(() => {
    setLayerIndex(1);
  }, []);

  const [layers, setLayers] = useState([
    createLayer(
      <TabsMenu onTabMaxout={handleTabMaxout} />
    ),
  ]);

  return (
    <div className='App'>
      <Stack layersState={[layers, setLayers]}>
        {stack => {
          const pushLayer = usePushLayer();

          const handleKeyPress = useCallback(() => {
            switch (layerIndex) {
            case 1:
              setLayerIndex(2);

              return pushLayer(
                <div style={{ height: '100%', background: 'purple', padding: 20 }}>
                  Side menu
                </div>
              , {
                keyframes: [
                  { width: '60%', left: '-60%' },
                  { width: '60%', left: '0' },
                ],
                timing: {
                  duration: 300,
                },
                mask: {
                  background: '#000',
                },
              });

            case 2:
              setLayerIndex(3);

              return pushLayer(
                <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ height: 300, width: '80%', background: 'brown', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    Modal
                  </div>
                </div>
              , {
                keyframes: [
                  { opacity: 0 },
                  { opacity: 1 },
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

          useEffect(() => {
            document.addEventListener('keypress', handleKeyPress);

            return () => {
              document.removeEventListener('keypress', handleKeyPress);
            };
          }, [handleKeyPress]);

          return stack;
        }}
      </Stack>
    </div>
  );
};

const renderTab = ({ layerIndex }) => (
  <div style={{ background: 'pink', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
    Page {layerIndex}
  </div>
);

const TabsMenu = ({ onTabMaxout }) => {
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

            const handleKeyPress = useCallback(() => {
              switch (layerIndex) {
              case 3:
                break;

              default:
                setLayerIndex(i => ++i);

                if (layerIndex === 2) {
                  onTabMaxout();
                }

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

            useEffect(() => {
              document.addEventListener('keypress', handleKeyPress);

              return () => {
                document.removeEventListener('keypress', handleKeyPress);
              };
            }, [handleKeyPress]);

            return stack;
          }}
        </Stack>
      </div>
    </div>
  );
};

export default App;
