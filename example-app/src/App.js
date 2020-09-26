import './App.css';

import React, { useCallback, useState } from 'react';
import { Stack, createLayer } from 'react-layers-stack';

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
          const [layerIndex, setlayerIndex] = useState(1);
          const pushPattyLayer = PattyLayer.usePush();
          const pushCheeseLayer = CheeseLayer.usePush();
          const pushTomatoLayer = TomatoLayer.usePush();
          const pushPickleLayer = PickleLayer.usePush();
          const pushOnionLayer = OnionLayer.usePush();
          const pushLettuceLayer = LettuceLayer.usePush();
          const pushTopBunLayer = TopBunLayer.usePush();
          const pushDoneLayer = DoneLayer.usePush();

          const handleClick = useCallback(() => {
            switch (layerIndex) {
              case 1:
                setlayerIndex(2);

                return pushPattyLayer();

              case 2:
                setlayerIndex(3);

                return pushCheeseLayer();

              case 3:
                setlayerIndex(4);

                return pushTomatoLayer();

              case 4:
                setlayerIndex(5);

                return pushPickleLayer();

              case 5:
                setlayerIndex(6);

                return pushOnionLayer();

              case 6:
                setlayerIndex(7);

                return pushLettuceLayer();

              case 7:
                setlayerIndex(8);

                return pushTopBunLayer();

              case 8:
                setlayerIndex(9);

                return pushDoneLayer();

              case 9:
                setlayerIndex(1);

                return setLayers([
                  createLayer(
                    <BottomBunLayer />
                  )
                ]);
            }
          }, [
            layerIndex,
            pushPattyLayer,
            pushCheeseLayer,
            pushTomatoLayer,
            pushPickleLayer,
            pushOnionLayer,
            pushLettuceLayer,
            pushTopBunLayer,
            pushDoneLayer,
          ]);

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
