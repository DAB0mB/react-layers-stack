import './Layer.css';

import React from 'react';
import { useWillFocusListener, useDidFocusListener, useWillBlurListener, useDidBlurListener } from 'react-layers-stack';

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
      <img src={require('../assets/pickle.png')} />
    </div>
  );
};

export default PickleLayer;
