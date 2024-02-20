'use client';

import React from 'react';
import classNamees from 'classnames/bind';
import { useGetDetailInfo } from '@/src/remote/query/auctionDetail';
import ProductInfo from '@/src/components/auctionDetailPage/ProductInfo';
import CommentContainer from '@/src/components/auctionDetailPage/CommentContainer';
import styles from './index.module.scss';

type AuctionDetailProps = {
  params: { slug: string };
};

const cx = classNamees.bind(styles);

const AuctionDetail = ({ params }: AuctionDetailProps) => {
  const boardId = params.slug;

  const { data, isPending } = useGetDetailInfo(boardId);

  if (!data) return;

  return (
    <div className={cx('page')}>
      <ProductInfo productInfo={data} />
      <CommentContainer productInfo={data} />
    </div>
  );
};

export default AuctionDetail;
