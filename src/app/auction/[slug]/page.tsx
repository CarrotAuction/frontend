'use client';

import React, { useEffect, useRef, useState } from 'react';
import { getCookie } from 'cookies-next';
import ProductInfo from '@/src/components/auctionPostPage/ProductInfo';
import CommentContainer from '@/src/components/auctionPostPage/CommentContainer';
import { CommentType } from '@/src/types/auctionDetail';
import {
  useGetDetailInfo,
  useGetDetailScroll,
} from '@/src/hooks/query/auctionDetail';
import { useObserver } from '@/src/hooks/useObserver';
import Loading from '@/src/common/Ui/Loading';
import styles from './page.module.scss';

export default function AuctionDetail({
  params,
}: {
  params: { slug: string };
}) {
  const boardId = params.slug;

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const token = getCookie('token');
  const [comment, setComment] = useState<CommentType[]>([]);

  const { isPending, data, refetch } = useGetDetailInfo(boardId);
  const { data: addCommnet, refetch: refetchScroll } = useGetDetailScroll({
    boardId,
    comment,
    totalComments: data?.totalComments,
  });

  useObserver({
    ref: bottomRef,
    refetchScroll,
    refetch,
    comment,
    totalComments: data?.totalComments,
  });

  useEffect(() => {
    setComment(data?.comments);
  }, [data]);

  useEffect(() => {
    if (comment && Array.isArray(comment) && Array.isArray(addCommnet)) {
      setComment((pre: CommentType[]) => {
        return [...pre, ...addCommnet];
      });
    }
  }, [addCommnet]);

  if (isPending) {
    return <Loading width="350" height="350" />;
  }

  return (
    <main className={styles.auctionPost}>
      <ProductInfo
        boardId={boardId}
        loginedId={token}
        productInfo={data?.board}
        refetch={refetch}
        setComment={setComment}
      />
      {comment && (
        <CommentContainer
          comments={comment}
          totalComment={data?.totalComments}
        />
      )}
      <div className={styles.hidden} ref={bottomRef} />
    </main>
  );
}
