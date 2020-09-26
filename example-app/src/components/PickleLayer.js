import './Layer.css';

import React, { useCallback } from 'react';

import {
  useWillFocusListener,
  useDidFocusListener,
  useWillBlurListener,
  useDidBlurListener,
  usePushLayer,
} from 'react-layers-stack';

const PickleLayer = () => {
  useWillFocusListener(() => {
    console.log('Incoming Pickle!');
  }, []);

  useDidFocusListener(() => {
    console.log('Hello Pickle!');
  }, []);

  useWillBlurListener(() => {
    console.log('Outgoing Pickle!');
  }, []);

  useDidBlurListener(() => {
    console.log('Bye Pickle!');
  }, []);

  return (
    <div className='Layer'>
      <img alt='pickle' src={require('../assets/pickle.png')} />
    </div>
  );
};

PickleLayer.usePush = () => {
  const pushLayer = usePushLayer();

  return useCallback(() => {
    pushLayer(
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
  }, [pushLayer]);
};

export default PickleLayer;
