'use client';

import React from 'react';
import classNamees from 'classnames/bind';
import Image from 'next/image';
import styles from './index.module.scss';

const AdvertisementModal = () => {
  const cx = classNamees.bind(styles);
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
        <button className={cx('button-oneDay')} type="button">
          1일간 다시 보지 않기
        </button>
        <button className={cx('button-close')} type="button">
          닫기
        </button>
      </div>
    </div>
  );
};

export default AdvertisementModal;
