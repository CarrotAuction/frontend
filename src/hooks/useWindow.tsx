import { throttle } from 'lodash';
import React, { useState } from 'react';

type WindowSize = {
  width: number;
  height: number;
};

type ReturnType = [
  windowSize: WindowSize,
  windowEventListener: () => () => void,
];

const useWindowSize = (): ReturnType => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const changeViewPort = throttle(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, 500);

  const windowEventListener = () => {
    window.addEventListener('resize', changeViewPort);
    return () => {
      window.removeEventListener('resize', changeViewPort);
    };
  };
  return [windowSize, windowEventListener];
};

export default useWindowSize;
