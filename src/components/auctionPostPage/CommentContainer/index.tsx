/* eslint-disable no-unneeded-ternary */
/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import { CommentType } from '@/src/types/auctionDetail';
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
              nickname={creator.nickname}
              flag={index === 0 ? true : false}
              price={price}
              openChatUrl={openChatUrl}
              createAt={createAt}
            />
          </div>
        );
      })}
    </section>
  );
};

export default CommentContainer;
