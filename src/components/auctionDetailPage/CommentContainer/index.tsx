import React from 'react';
import { AuctionDetail } from '@/src/types/auctionDetail';
import classNamees from 'classnames/bind';
import styles from './index.module.scss';
import Comment from '../Comment';

type Props = {
  productInfo: AuctionDetail;
};

const CommentContainer = ({ productInfo }: Props) => {
  const { board, comments, totalComments } = productInfo;

  const cx = classNamees.bind(styles);

  return (
    <section className={cx('postComments')}>
      <p>{`경매 참여 현황: ${totalComments}`}</p>
      <hr />
      {comments?.map((comment, index) => {
        const { createAt, price, openChatUrl, creator } = comment;

        return (
          <div
            className={cx('comment', { highlight: index === 0 })}
            key={index}
          >
            <Comment
              nickname={creator.nickname}
              flag={index === 0}
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
