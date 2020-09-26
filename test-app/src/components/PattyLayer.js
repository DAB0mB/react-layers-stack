import './Layer.css';

import React from 'react';
import { useWillFocusListener, useDidFocusListener, useWillBlurListener, useDidBlurListener } from 'react-sandwich-navigation';

const PattyLayer = () => {
  useWillFocusListener(() => {
    console.log('Incoming Patty!');
  }, []);

  useDidFocusListener(() => {
    console.log('Hello Patty!');
  }, []);

  useWillBlurListener(() => {
    console.log('Outgoing Patty!');
  }, []);

  useDidBlurListener(() => {
    console.log('Bye Patty!');
  });

  return (
    <div className='Layer'>Patty</div>
  );
};

export default PattyLayer;
