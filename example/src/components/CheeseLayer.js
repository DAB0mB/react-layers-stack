import './Layer.css';

import React, { useCallback } from 'react';

import {
  useWillFocusListener,
  useDidFocusListener,
  useWillBlurListener,
  useDidBlurListener,
  usePushLayer,
} from 'react-layers-stack';

const CheeseLayer = () => {
  useWillFocusListener(() => {
    console.log('Incoming Cheese!');
  }, []);

  useDidFocusListener(() => {
    console.log('Hello Cheese!');
  }, []);

  useWillBlurListener(() => {
    console.log('Outgoing Cheese!');
  }, []);

  useDidBlurListener(() => {
    console.log('Bye Cheese!');
  }, []);

  return (
    <div className='Layer'>
      <img alt='cheese' src={require('../assets/cheese.png')} />
    </div>
  );
};

CheeseLayer.usePush = () => {
  const pushLayer = usePushLayer();

  return useCallback(() => {
    pushLayer(
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
  }, [pushLayer]);
};

export default CheeseLayer;
