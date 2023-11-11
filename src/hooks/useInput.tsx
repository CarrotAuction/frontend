'use client';

import React, { useState } from 'react';

type ReturnType = [string, (e: React.ChangeEvent<HTMLInputElement>) => void];

const useInput = (): ReturnType => {
  const [value, setValue] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    console.log(e.target.value);
  };

  return [value, onChange];
};

export default useInput;
