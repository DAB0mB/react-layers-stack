import './Layer.css';

import React from 'react';
import { useWillFocusListener, useDidFocusListener, useWillBlurListener, useDidBlurListener } from 'react-sandwich-navigation';

const TomatoLayer = () => {
  useWillFocusListener(() => {
    console.log('Incoming Tomato!');
  }, []);

  useDidFocusListener(() => {
    console.log('Hello Tomato!');
  }, []);

  useWillBlurListener(() => {
    console.log('Outgoing Tomato!');
  }, []);

  useDidBlurListener(() => {
    console.log('Bye Tomato!');
  }, []);

  return (
    <div className='Layer'>
      <img src={require('../assets/tomato.png')} />
    </div>
  );
};

export default TomatoLayer;
