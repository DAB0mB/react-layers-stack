import './Layer.css';

import React, { useCallback } from 'react';

import {
  useWillFocusListener,
  useDidFocusListener,
  useWillBlurListener,
  useDidBlurListener,
  usePushLayer,
} from 'react-layers-stack';

const OnionLayer = () => {
  useWillFocusListener(() => {
    console.log('Incoming Onion!');
  }, []);

  useDidFocusListener(() => {
    console.log('Hello Onion!');
  }, []);

  useWillBlurListener(() => {
    console.log('Outgoing Onion!');
  }, []);

  useDidBlurListener(() => {
    console.log('Bye Onion!');
  }, []);

  return (
    <div className='Layer'>
      <img alt='onion' src={require('../assets/onion.png')} />
    </div>
  );
};

OnionLayer.usePush = () => {
  const pushLayer = usePushLayer();

  return useCallback(() => {
    pushLayer(
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
  }, [pushLayer]);
};

export default OnionLayer;
