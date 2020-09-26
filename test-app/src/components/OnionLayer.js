import './Layer.css';

import React from 'react';
import { useWillFocusListener, useDidFocusListener, useWillBlurListener, useDidBlurListener } from 'react-sandwich-navigation';

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
  });

  return (
    <div className='Layer'>Onion</div>
  );
};

export default OnionLayer;
