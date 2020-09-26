import './Layer.css';

import React from 'react';
import { useWillFocusListener, useDidFocusListener, useWillBlurListener, useDidBlurListener } from 'react-layers-stack';

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
      <img src={require('../assets/onion.png')} />
    </div>
  );
};

export default OnionLayer;
