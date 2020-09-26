import './App.css';

import React, { useCallback, useState } from 'react';
import { Stack, createLayer, usePushLayer } from 'react-layers-stack';

import BottomBunLayer from './components/BottomBunLayer';
import CheeseLayer from './components/CheeseLayer';
import LettuceLayer from './components/LettuceLayer';
import OnionLayer from './components/OnionLayer';
import PattyLayer from './components/PattyLayer';
import PickleLayer from './components/PickleLayer';
import TomatoLayer from './components/TomatoLayer';
import TopBunLayer from './components/TopBunLayer';
import DoneLayer from './components/DoneLayer';

const App = () => {
  const [layers, setLayers] = useState([
    createLayer(
      <BottomBunLayer />
    ),
  ]);

  return (
    <div className='App'>
      <Stack layersState={[layers, setLayers]}>
        {stack => {
          const pushLayer = usePushLayer();
          const [layerIndex, setlayerIndex] = useState(1);

          const handleClick = useCallback(() => {
            switch (layerIndex) {
              case 1:
                setlayerIndex(2);

                return pushLayer(
                  <PattyLayer />
                , {
                  keyframes: [
                    { left: '-100%' },
                    { left: '0' },
                  ],
                  timing: {
                    duration: 500
                  },
                });

              case 2:
                setlayerIndex(3);

                return pushLayer(
                  <CheeseLayer />
                , {
                  keyframes: [
                    { right: '-100%' },
                    { right: '0' },
                  ],
                  timing: {
                    duration: 500
                  },
                });

              case 3:
                setlayerIndex(4);

                return pushLayer(
                  <TomatoLayer />
                , {
                  keyframes: [
                    { left: '-100%' },
                    { left: '0' },
                  ],
                  timing: {
                    duration: 500
                  },
                });

              case 4:
                setlayerIndex(5);

                return pushLayer(
                  <PickleLayer />
                , {
                  keyframes: [
                    { right: '-100%' },
                    { right: '0' },
                  ],
                  timing: {
                    duration: 500
                  },
                });

              case 5:
                setlayerIndex(6);

                return pushLayer(
                  <OnionLayer />
                , {
                  keyframes: [
                    { left: '-100%' },
                    { left: '0' },
                  ],
                  timing: {
                    duration: 500
                  },
                });

              case 6:
                setlayerIndex(7);

                return pushLayer(
                  <LettuceLayer />
                , {
                  keyframes: [
                    { right: '-100%' },
                    { right: '0' },
                  ],
                  timing: {
                    duration: 500
                  },
                });

              case 7:
                setlayerIndex(8);

                return pushLayer(
                  <TopBunLayer />
                , {
                  keyframes: [
                    { top: '-100%' },
                    { top: '0' },
                  ],
                  timing: {
                    duration: 500
                  },
                });

              case 8:
                setlayerIndex(9);

                return pushLayer(
                  <DoneLayer />
                , {
                  keyframes: [
                    { opacity: 0 },
                    { opacity: 1 },
                  ],
                  timing: {
                    duration: 500
                  },
                  mask: {
                    background: '#fff',
                    opacity: 1,
                  },
                });

              case 9:
                setlayerIndex(1);

                setLayers([
                  createLayer(
                    <BottomBunLayer />
                  )
                ]);
            }
          }, [layerIndex, pushLayer]);

          return (
            <div className='App-stack' onClick={handleClick}>
              {stack}
            </div>
          );
        }}
      </Stack>
    </div>
  );
};

export default App;
