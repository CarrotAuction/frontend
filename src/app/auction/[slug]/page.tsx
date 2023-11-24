'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { getCookie } from 'cookies-next';
import { ProductInfoType, CommentType } from '@/src/types/auctionDetail';
import { GetAuctionDetail, GetComments } from '@/src/apis/AuctionDetail';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Swal from 'sweetalert2';
import ProductInfo from '@/src/components/auctionPostPage/ProductInfo';
import CommentContainer from '@/src/components/auctionPostPage/CommentContainer';
import styles from './page.module.scss';

export default function AuctionDetail({
  params,
}: {
  params: { slug: string };
}) {
  const bottom = useRef<HTMLDivElement>(null);
  const token = getCookie('token');
  const [productInfo, setProductInfo] = useState<ProductInfoType>({});
  const [comments, setComments] = useState<CommentType[]>([]);
  const [commentCount, setCommentCount] = useState<number>(0);

  const { mutate } = useMutation({
    mutationFn: (id: string) => GetAuctionDetail(id),
    onSuccess: (data) => {
      setProductInfo({ ...data.board });
      setComments(data.comments);
      setCommentCount(Number(data.totalComments));
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error?.response?.data?.message) {
          Swal.fire({
            icon: 'error',
            title: `${error.response.data.message}`,
          });
        }
      }
    },
  });

  useEffect(() => {
    mutate(params.slug);
  }, [commentCount]);

  const handleIntersect = useCallback(
    async ([entry]: IntersectionObserverEntry[]) => {
      if (entry.isIntersecting) {
        const loadedComments = await GetComments({
          boardId: Number(params.slug),
          cursor: comments.length + 1,
        });
        if (loadedComments) {
          setComments([...comments, ...loadedComments]);
        }
      }
    },
    [],
  );
  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 0.9,
      root: null,
    });

    bottom.current && observer.observe(bottom.current);

    return () => {
      observer.disconnect();
    };
  }, [handleIntersect, bottom.current]);
  return (
    <main className={styles.auctionPost}>
      <ProductInfo
        auctionId={params.slug}
        loginedId={token}
        commentCount={commentCount}
        updateCommentCount={setCommentCount}
      />
      <CommentContainer comments={comments} totalComment={commentCount} />
      <div ref={bottom} />
    </main>
  );
}
