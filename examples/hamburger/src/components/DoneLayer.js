import './Layer.css';
import './DoneLayer.css';

import React, { useCallback } from 'react';
import { usePushLayer } from 'react-layers-stack';

const DoneLayer = () => {
  return (
    <div className='Layer DoneLayer'>
      <div>react-layers-stack</div>
    </div>
  );
};

DoneLayer.usePush = () => {
  const pushLayer = usePushLayer();

  return useCallback(() => {
    pushLayer(
      <DoneLayer />
    , {
      keyframes: [
        { opacity: 0 },
        { opacity: 1 },
      ],
      timing: {
        duration: 500
      },
      mask: {
        background: '#fff',
        opacity: 1,
      },
    });
  }, [pushLayer]);
};

export default DoneLayer;
