'use client';

import router from 'next/router';
import React, { useEffect } from 'react';
import classNamees from 'classnames/bind';
import { GetAuctionDetail } from '@/src/remote/apis/AuctionDetail';
import styles from './index.module.scss';

type AuctionDetailProps = {
  params: { slug: string };
};

const cx = classNamees.bind(styles);

const AuctionDetail = ({ params }: AuctionDetailProps) => {
  const boardId = params.slug;

  useEffect(() => {
    (async () => {
      const res = await GetAuctionDetail(boardId);
      console.log(res);
      return res;
    })();
  }, []);

  return <div className={cx('page')}>안녕하세요 {boardId}</div>;
};

export default AuctionDetail;
