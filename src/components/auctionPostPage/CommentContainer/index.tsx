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
      {comments.map((comment, index) => (
        <Comment
          // 백엔드에서 key 값 주면 key 추가하기. 현재 렌더링은 문제 없지만 key 값 넣으라고 오류 발생.
          // eslint-disable-next-line react/no-array-index-key
          key={index}
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
