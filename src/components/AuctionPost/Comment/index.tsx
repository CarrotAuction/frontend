import React from 'react';
import styles from './index.module.scss';

type Props = {
  nickname: string;
  auctionPrice: number;
  openChattingLink: string;
  date: string; // 나중에 백엔드에서 넘어오는 타입 보고 바꿔야 함
};

const Comment = ({
  nickname, auctionPrice, openChattingLink, date,
}: Props) => {
  return (
    <article className={styles.comment}>
      <div className={styles.commentDetail}>
        <div>
          <span>{nickname}</span>
          <span>{date}</span>
        </div>
        <span>{openChattingLink}</span>
      </div>
      <div className={styles.commentOfPrice}>
        <span>{`${auctionPrice.toLocaleString('ko-KR')}원`}</span>
      </div>
    </article>
  );
};

export default Comment;
