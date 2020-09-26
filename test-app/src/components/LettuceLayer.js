import './Layer.css';

import React from 'react';
import { useWillFocusListener, useDidFocusListener, useWillBlurListener, useDidBlurListener } from 'react-sandwich-navigation';

const LattuceLayer = () => {
  useWillFocusListener(() => {
    console.log('Incoming Lattuce!');
  }, []);

  useDidFocusListener(() => {
    console.log('Hello Lattuce!');
  }, []);

  useWillBlurListener(() => {
    console.log('Outgoing Lattuce!');
  }, []);

  useDidBlurListener(() => {
    console.log('Bye Lattuce!');
  });

  return (
    <div className='Layer'>Lattuce</div>
  );
};

export default LattuceLayer;
