import './Layer.css';

import React, { useCallback } from 'react';

import {
  useWillFocusListener,
  useDidFocusListener,
  useWillBlurListener,
  useDidBlurListener,
  usePushLayer,
} from 'react-layers-stack';

const TopBunLayer = () => {
  useWillFocusListener(() => {
    console.log('Incoming TopBun!');
  }, []);

  useDidFocusListener(() => {
    console.log('Hello TopBun!');
  }, []);

  useWillBlurListener(() => {
    console.log('Outgoing TopBun!');
  }, []);

  useDidBlurListener(() => {
    console.log('Bye TopBun!');
  }, []);

  return (
    <div className='Layer'>
      <img alt='top-bun' src={require('../assets/top-bun.png')} />
    </div>
  );
};

TopBunLayer.usePush = () => {
  const pushLayer = usePushLayer();

  return useCallback(() => {
    pushLayer(
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
  }, [pushLayer]);
};

export default TopBunLayer;
