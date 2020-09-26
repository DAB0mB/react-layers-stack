import './Layer.css';

import React from 'react';
import { useWillFocusListener, useDidFocusListener, useWillBlurListener, useDidBlurListener } from 'react-layers-stack';

const LettuceLayer = () => {
  useWillFocusListener(() => {
    console.log('Incoming Lettuce!');
  }, []);

  useDidFocusListener(() => {
    console.log('Hello Lettuce!');
  }, []);

  useWillBlurListener(() => {
    console.log('Outgoing Lettuce!');
  }, []);

  useDidBlurListener(() => {
    console.log('Bye Lettuce!');
  }, []);

  return (
    <div className='Layer'>
      <img src={require('../assets/lettuce.png')} />
    </div>
  );
};

export default LettuceLayer;
