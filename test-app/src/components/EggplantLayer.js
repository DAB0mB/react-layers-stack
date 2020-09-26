import './Layer.css';

import React from 'react';
import { useWillFocusListener, useDidFocusListener, useWillBlurListener, useDidBlurListener } from 'react-sandwich-navigation';

const EggplantLayer = () => {
  useWillFocusListener(() => {
    console.log('Incoming Eggplant!');
  }, []);

  useDidFocusListener(() => {
    console.log('Hello Eggplant!');
  }, []);

  useWillBlurListener(() => {
    console.log('Outgoing Eggplant!');
  }, []);

  useDidBlurListener(() => {
    console.log('Bye Eggplant!');
  });

  return (
    <div className='Layer'>Eggplant</div>
  );
};

export default EggplantLayer;
