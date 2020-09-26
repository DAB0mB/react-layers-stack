import './App.css';

import React, { useCallback, useState } from 'react';
import { Sandwich, createLayer, usePushLayer } from 'react-sandwich-navigation';

import BottomBunLayer from './components/BottomBunLayer';
import PattyLayer from './components/PattyLayer';
import LettuceLayer from './components/LettuceLayer';
import OnionLayer from './components/OnionLayer';
import TomatoLayer from './components/TomatoLayer';
import MushroomLayer from './components/MushroomLayer';
import EggplantLayer from './components/EggplantLayer';
import AvocadoLayer from './components/AvocadoLayer';
import TopBunLayer from './components/TopBunLayer';
import ResetLayer from './components/ResetLayer';

const App = () => {
  const [layers, setLayers] = useState([
    createLayer(
      <BottomBunLayer />
    ),
  ]);

  return (
    <div className='App'>
      <Sandwich layersState={[layers, setLayers]}>
        {sandwich => {
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
                  <LettuceLayer />
                , {
                  keyframes: [
                    { left: '-100%' },
                    { left: '0' },
                  ],
                  timing: {
                    duration: 500
                  },
                });

              case 3:
                setlayerIndex(4);

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

              case 4:
                setlayerIndex(5);

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

              case 5:
                setlayerIndex(6);

                return pushLayer(
                  <MushroomLayer />
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
                  <EggplantLayer />
                , {
                  keyframes: [
                    { left: '-100%' },
                    { left: '0' },
                  ],
                  timing: {
                    duration: 500
                  },
                });

              case 7:
                setlayerIndex(8);

                return pushLayer(
                  <AvocadoLayer />
                , {
                  keyframes: [
                    { left: '-100%' },
                    { left: '0' },
                  ],
                  timing: {
                    duration: 500
                  },
                });

              case 8:
                setlayerIndex(9);

                return pushLayer(
                  <TopBunLayer />
                , {
                  keyframes: [
                    { left: '-100%' },
                    { left: '0' },
                  ],
                  timing: {
                    duration: 500
                  },
                });

              case 9:
                setlayerIndex(10);

                return pushLayer(
                  <ResetLayer />
                , {
                  keyframes: [
                    { opacity: 0 },
                    { opacity: 1 },
                  ],
                  timing: {
                    duration: 500
                  },
                  mask: {
                    background: '#000',
                  },
                });

              case 10:
                setlayerIndex(1);

                setLayers([
                  createLayer(
                    <BottomBunLayer />
                  )
                ]);
            }
          }, [layerIndex, pushLayer]);

          return (
            <div className='App-sandwich' onClick={handleClick}>
              {sandwich}
            </div>
          );
        }}
      </Sandwich>
    </div>
  );
};

export default App;
