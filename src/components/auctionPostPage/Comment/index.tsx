import React from 'react';
import { format, register } from 'timeago.js';
import koLocale from 'timeago.js/lib/lang/ko';
import styles from './index.module.scss';

type Props = {
  nickname: string;
  price: number;
  openChatUrl: string;
  createAt: string;
  flag: boolean;
};

const Comment = ({ nickname, price, openChatUrl, createAt, flag }: Props) => {
  register('ko', koLocale);
  return (
    <>
      <div className={styles.commentDetail}>
        <div>
          <span>{nickname}</span>
          <span className={flag ? styles.highlight : undefined}>
            {format(createAt, 'ko')}
          </span>
        </div>
        <span>{openChatUrl}</span>
      </div>
      <div className={styles.commentOfPrice}>
        <span>{`${price.toLocaleString('ko-KR')}원`}</span>
      </div>
    </>
  );
};

export default Comment;
