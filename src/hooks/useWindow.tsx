import { throttle } from 'lodash';
import React, { useEffect, useState } from 'react';

type WindowSize = {
  width: number;
  height: number;
};

type ReturnType = [windowSize: WindowSize];

const useWindowSize = (): ReturnType => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const changeViewPort = throttle(() => {
      if (typeof window !== 'undefined') {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
    }, 500);

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', changeViewPort);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', changeViewPort);
      }
    };
  }, []);

  return [windowSize];
};

export default useWindowSize;
