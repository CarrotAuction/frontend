'use client';

import React, { useEffect, useRef } from 'react';
import { getCookie } from 'cookies-next';
import ProductInfo from '@/src/components/auctionPostPage/ProductInfo';
import CommentContainer from '@/src/components/auctionPostPage/CommentContainer';
import { useGetDetailInfo } from '@/src/hooks/query/auctionDetail';
import styles from './page.module.scss';

export default function AuctionDetail({
  params,
}: {
  params: { slug: string };
}) {
  const bottom = useRef<HTMLDivElement>(null);
  const token = getCookie('token');
  const boardId = params.slug;

  const { isPending, data, refetch } = useGetDetailInfo(boardId);

  useEffect(() => {
    refetch();
  }, []);

  if (isPending) {
    return 'loading...';
  }

  return (
    <main className={styles.auctionPost}>
      <ProductInfo
        boardId={boardId}
        loginedId={token}
        productInfo={data?.board}
      />
      <CommentContainer
        comments={data?.comments}
        totalComment={data?.totalComments}
      />
      <div ref={bottom} />
    </main>
  );
}
