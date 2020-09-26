import './Layer.css';

import React from 'react';
import { useWillFocusListener, useDidFocusListener, useWillBlurListener, useDidBlurListener } from 'react-sandwich-navigation';

const MushroomLayer = () => {
  useWillFocusListener(() => {
    console.log('Incoming Mushroom!');
  }, []);

  useDidFocusListener(() => {
    console.log('Hello Mushroom!');
  }, []);

  useWillBlurListener(() => {
    console.log('Outgoing Mushroom!');
  }, []);

  useDidBlurListener(() => {
    console.log('Bye Mushroom!');
  });

  return (
    <div className='Layer'>Mushroom</div>
  );
};

export default MushroomLayer;
