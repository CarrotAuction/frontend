'use client';

import React, { useState } from 'react';
import classNamees from 'classnames/bind';
import Image from 'next/image';
import { setCookie } from 'cookies-next';
import styles from './index.module.scss';

type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AdvertisementModal = ({ setOpen }: Props) => {
  const cx = classNamees.bind(styles);

  const oneDayInMillis = 24 * 60 * 60 * 1000;
  const handleGetModalCookie = () => {
    setOpen(false);
    setCookie('ad-modal', true, {
      expires: new Date(Date.now() + oneDayInMillis),
    });
  };

  const handleModalClose = () => {
    setOpen(false);
  };
  return (
    <div className={cx('wrapper')}>
      <div className={cx('image')}>
        <Image
          fill
          src="https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
      </div>
      <div className={cx('buttons')}>
        <button
          onClick={handleGetModalCookie}
          className={cx('button-oneDay')}
          type="button"
        >
          1일간 다시 보지 않기
        </button>
        <button
          onClick={handleModalClose}
          className={cx('button-close')}
          type="button"
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default AdvertisementModal;
