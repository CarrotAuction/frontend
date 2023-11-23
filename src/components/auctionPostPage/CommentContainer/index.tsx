/* eslint-disable no-unneeded-ternary */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { ProductInfoType, CommentType } from '@/src/types/auctionDetail';
import { GetAuctionDetail } from '@/src/apis/AuctionDetail';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import styles from './index.module.scss';
import Comment from '../Comment';

type Props = {
  comments: CommentType[];
  totalComment: number;
};

const CommentContainer = ({ comments, totalComment }: Props) => {
  return (
    <section className={styles.postComments}>
      <p>{`경매 참여 현황: ${totalComment}`}</p>
      <hr />
      {comments?.map((comment, index) => {
        const { createAt, id, price, openChatUrl, creator } = comment;

        return (
          <div
            className={`${styles.comment} ${
              index === 0 ? styles.highlight : null
            }`}
            key={id}
          >
            <Comment
              // 백엔드에서 key 값 주면 key 추가하기. 현재 렌더링은 문제 없지만 key 값 넣으라고 오류 발생.
              nickname={creator.nickname}
              auctionPrice={price}
              openChattingLink={openChatUrl}
              date={createAt}
              flag={index === 0 ? true : false}
            />
          </div>
        );
      })}
    </section>
  );
};

export default CommentContainer;
