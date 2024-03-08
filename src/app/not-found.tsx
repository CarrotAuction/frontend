import Link from 'next/link';
import React from 'react';
import classNamees from 'classnames/bind';
import styles from '../styles/not-found.module.scss';

const cx = classNamees.bind(styles);

const NotFound = () => {
  return (
    <div className={cx('page')}>
      <p>존재하지 않는 페이지입니다 !</p>
      <Link href="/">홈으로 돌아가기</Link>
    </div>
  );
};

export default NotFound;
