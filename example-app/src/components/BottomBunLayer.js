import './Layer.css';

import React from 'react';
import { useWillBlurListener, useDidBlurListener } from 'react-layers-stack';

const BunLayer = () => {
  useWillBlurListener(() => {
    console.log('Outgoing Bottom Bun!');
  }, []);

  useDidBlurListener(() => {
    console.log('Bye Bottom Bun!');
  }, []);

  return (
    <div className='Layer'>
      <img alt='bottom-bun' src={require('../assets/bottom-bun.png')} />
    </div>
  );
};

export default BunLayer;
