import './Layer.css';

import React from 'react';
import { useWillFocusListener, useDidFocusListener, useWillBlurListener, useDidBlurListener } from 'react-sandwich-navigation';

const AvocadoLayer = () => {
  useWillFocusListener(() => {
    console.log('Incoming Avocado!');
  }, []);

  useDidFocusListener(() => {
    console.log('Hello Avocado!');
  }, []);

  useWillBlurListener(() => {
    console.log('Outgoing Avocado!');
  }, []);

  useDidBlurListener(() => {
    console.log('Bye Avocado!');
  });

  return (
    <div className='Layer'>Avocado</div>
  );
};

export default AvocadoLayer;
