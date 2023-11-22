import { getCookie } from 'cookies-next';
import React from 'react';

const UseCookies = () => {
  if (typeof window !== 'undefined') {
    const token = getCookie('token');
    return token;
  }
};

export default UseCookies;
