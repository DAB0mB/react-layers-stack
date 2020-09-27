import './Layer.css';

import React, { useCallback } from 'react';

import {
  useWillFocusListener,
  useDidFocusListener,
  useWillBlurListener,
  useDidBlurListener,
  usePushLayer,
} from 'react-layers-stack';

const PattyLayer = () => {
  useWillFocusListener(() => {
    console.log('Incoming Patty!');
  }, []);

  useDidFocusListener(() => {
    console.log('Hello Patty!');
  }, []);

  useWillBlurListener(() => {
    console.log('Outgoing Patty!');
  }, []);

  useDidBlurListener(() => {
    console.log('Bye Patty!');
  }, []);

  return (
    <div className='Layer'>
      <img alt='patty' src={require('../assets/patty.png')} />
    </div>
  );
};

PattyLayer.usePush = () => {
  const pushLayer = usePushLayer();

  return useCallback(() => {
    pushLayer(
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
  }, [pushLayer]);
};

export default PattyLayer;
