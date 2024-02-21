'use client';

import React, { useEffect, useRef, useState } from 'react';
import classNamees from 'classnames/bind';
import {
  useGetComments,
  useGetDetailInfo,
} from '@/src/remote/query/auctionDetail';
import { useInView } from 'react-intersection-observer';
import ProductInfo from '@/src/components/auctionDetailPage/ProductInfo';
import { CreatorCommentType } from '@/src/types/auctionDetail';
import CommentContainer from '@/src/components/auctionDetailPage/CommentContainer';
import styles from './index.module.scss';

type AuctionDetailProps = {
  params: { slug: string };
};

const cx = classNamees.bind(styles);

const AuctionDetail = ({ params }: AuctionDetailProps) => {
  const boardId = params.slug;
  const [ref, inView] = useInView();
  const [comment, setCommnet] = useState<CreatorCommentType[]>([]);
  const { data } = useGetDetailInfo(boardId);
  const cursor = comment[comment.length - 1]?.id;
  const { data: commentData, isPending: isCommentPending } = useGetComments({
    boardId,
    cursor,
    inView,
  });

  useEffect(() => {
    if (commentData) setCommnet((pre) => [...pre, ...commentData]);
  }, [commentData]);

  useEffect(() => {
    if (data) {
      setCommnet(data.comments);
    }
  }, [data]);

  if (!data) return;
  return (
    <div className={cx('page')}>
      <ProductInfo productInfo={data} />
      <CommentContainer totalComments={data.totalComments} comments={comment} />
      <div style={{ display: 'hidden', height: '100px' }} ref={ref} />
    </div>
  );
};

export default AuctionDetail;
