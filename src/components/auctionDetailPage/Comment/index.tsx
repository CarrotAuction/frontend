import React from 'react';
import { format, register } from 'timeago.js';
import koLocale from 'timeago.js/lib/lang/ko';
import classNamees from 'classnames/bind';
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

  const cx = classNamees.bind(styles);
  return (
    <>
      <div className={cx('commentDetail')}>
        <div>
          <span>{nickname}</span>
          <span className={cx({ highlight: flag })}>
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
