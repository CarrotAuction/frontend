import React from 'react';
import styles from './index.module.scss';
import Comment from '../Comment';

type Props = {
  comments: any[];
};

const CommentContainer = ({ comments }: Props) => {
  return (
    <section className={styles.postComments}>
      <p>{`경매 참여 현황: ${comments.length}`}</p>
      <hr />
      {comments.map((comment) => (
        <Comment
          nickname={comment.nickname}
          auctionPrice={comment.auctionPrice}
          openChattingLink={comment.openChattingLink}
          date={comment.date}
        />
      ))}
    </section>
  );
};

export default CommentContainer;
