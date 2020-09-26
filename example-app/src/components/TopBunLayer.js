import './Layer.css';

import React from 'react';
import { useWillFocusListener, useDidFocusListener, useWillBlurListener, useDidBlurListener } from 'react-layers-stack';

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

export default TopBunLayer;
