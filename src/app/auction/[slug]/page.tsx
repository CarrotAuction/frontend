'use client';

import React, { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import { ProductInfoType, CommentType } from '@/src/types/auctionDetail';
import { GetAuctionDetail } from '@/src/apis/AuctionDetail';
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
  const token = getCookie('token');
  const [productInfo, setProductInfo] = useState<ProductInfoType>({});
  const [comments, setComments] = useState<CommentType[]>([]);
  const [commentCount, setCommentCount] = useState<number>(0);
  const { mutate } = useMutation({
    mutationFn: (id: string) => GetAuctionDetail(id),
    onSuccess: (data) => {
      setProductInfo({ ...data.board });
      setComments(data.comments);
      setCommentCount(data.totalComments);
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
  }, [comments]);
  return (
    <main className={styles.auctionPost}>
      <ProductInfo auctionId={params.slug} loginedId={token} />
      <CommentContainer comments={comments} totalComment={commentCount} />
    </main>
  );
}
