'use client';

import router from 'next/router';
import React, { useEffect } from 'react';
import classNamees from 'classnames/bind';
import { useGetDetailInfo } from '@/src/remote/query/auctionDetail';
import styles from './index.module.scss';

type AuctionDetailProps = {
  params: { slug: string };
};

const cx = classNamees.bind(styles);

const AuctionDetail = ({ params }: AuctionDetailProps) => {
  const boardId = params.slug;

  const { data } = useGetDetailInfo(boardId);

  console.log(data);
  return <div className={cx('page')}>d</div>;
};

export default AuctionDetail;
