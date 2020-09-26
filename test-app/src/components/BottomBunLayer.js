import './Layer.css';

import React from 'react';
import { useWillFocusListener, useDidFocusListener, useWillBlurListener, useDidBlurListener } from 'react-sandwich-navigation';

const BunLayer = () => {
  useWillFocusListener(() => {
    console.log('Incoming Bottom Bun!');
  }, []);

  useDidFocusListener(() => {
    console.log('Hello Bottom Bun!');
  }, []);

  useWillBlurListener(() => {
    console.log('Outgoing Bottom Bun!');
  }, []);

  useDidBlurListener(() => {
    console.log('Bye Bottom Bun!');
  }, []);

  return (
    <div className='Layer'>
      <img src={require('../assets/bottom-bun.png')} />
    </div>
  );
};

export default BunLayer;
