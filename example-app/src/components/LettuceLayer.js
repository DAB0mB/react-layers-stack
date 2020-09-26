import './Layer.css';

import React, { useCallback } from 'react';

import {
  useWillFocusListener,
  useDidFocusListener,
  useWillBlurListener,
  useDidBlurListener,
  usePushLayer,
} from 'react-layers-stack';

const LettuceLayer = () => {
  useWillFocusListener(() => {
    console.log('Incoming Lettuce!');
  }, []);

  useDidFocusListener(() => {
    console.log('Hello Lettuce!');
  }, []);

  useWillBlurListener(() => {
    console.log('Outgoing Lettuce!');
  }, []);

  useDidBlurListener(() => {
    console.log('Bye Lettuce!');
  }, []);

  return (
    <div className='Layer'>
      <img alt='lettuce' src={require('../assets/lettuce.png')} />
    </div>
  );
};

LettuceLayer.usePush = () => {
  const pushLayer = usePushLayer();

  return useCallback(() => {
    pushLayer(
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
  }, [pushLayer]);
};

export default LettuceLayer;
