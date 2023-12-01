'use client';

import React, { useEffect, useRef, useState } from 'react';
import { getCookie } from 'cookies-next';
import ProductInfo from '@/src/components/auctionPostPage/ProductInfo';
import CommentContainer from '@/src/components/auctionPostPage/CommentContainer';
import { CommentType } from '@/src/types/auctionDetail';
import { useGetDetailInfo } from '@/src/hooks/query/auctionDetail';
import { useInfiniteQuery } from '@tanstack/react-query';
import styles from './page.module.scss';

export default function AuctionDetail({
  params,
}: {
  params: { slug: string };
}) {
  const bottom = useRef<HTMLDivElement>(null);
  const token = getCookie('token');
  const boardId = params.slug;
  const [comment, setComment] = useState<CommentType[]>([]);
  const { isPending, data, refetch } = useGetDetailInfo(boardId);

  const {
    data: addComment,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    'myInfiniteQueryKey',
    ({ pageParam = 1 }) => fetchData('myInfiniteQueryKey', pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.nextPage; // Adjust based on your API response structure
      },
    },
  );

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    setComment(data);
  }, [data]);

  if (isPending) {
    return 'loading...';
  }

  return (
    <main className={styles.auctionPost}>
      <ProductInfo
        boardId={boardId}
        loginedId={token}
        productInfo={data?.board}
        refetch={refetch}
      />
      <CommentContainer
        comments={data?.comments}
        totalComment={data?.totalComments}
      />
      <div ref={bottom} />
    </main>
  );
}
