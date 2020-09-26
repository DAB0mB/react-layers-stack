import './Layer.css';

import React from 'react';
import { useWillFocusListener, useDidFocusListener, useWillBlurListener, useDidBlurListener } from 'react-layers-stack';

const CheeseLayer = () => {
  useWillFocusListener(() => {
    console.log('Incoming Cheese!');
  }, []);

  useDidFocusListener(() => {
    console.log('Hello Cheese!');
  }, []);

  useWillBlurListener(() => {
    console.log('Outgoing Cheese!');
  }, []);

  useDidBlurListener(() => {
    console.log('Bye Cheese!');
  }, []);

  return (
    <div className='Layer'>
      <img src={require('../assets/cheese.png')} />
    </div>
  );
};

export default CheeseLayer;
