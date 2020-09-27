import './Layer.css';

import React, { useCallback } from 'react';

import {
  useWillFocusListener,
  useDidFocusListener,
  useWillBlurListener,
  useDidBlurListener,
  usePushLayer,
} from 'react-layers-stack';

const TomatoLayer = () => {
  useWillFocusListener(() => {
    console.log('Incoming Tomato!');
  }, []);

  useDidFocusListener(() => {
    console.log('Hello Tomato!');
  }, []);

  useWillBlurListener(() => {
    console.log('Outgoing Tomato!');
  }, []);

  useDidBlurListener(() => {
    console.log('Bye Tomato!');
  }, []);

  return (
    <div className='Layer'>
      <img alt='tomato' src={require('../assets/tomato.png')} />
    </div>
  );
};

TomatoLayer.usePush = () => {
  const pushLayer = usePushLayer();

  return useCallback(() => {
    pushLayer(
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
  }, [pushLayer]);
};

export default TomatoLayer;
