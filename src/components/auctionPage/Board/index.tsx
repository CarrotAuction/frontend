/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import Image from 'next/image';
import { CreatorInfo } from '@/src/types/search';
import { format, register } from 'timeago.js';
import koLocale from 'timeago.js/lib/lang/ko';
import { useRouter } from 'next/navigation';
import profile from '../../../assets/auction/profile.jpg';

import styles from './index.module.scss';

type Props = {
  createAt: Date;
  creator: CreatorInfo;
  id: number;
  stuffCategory: string;
  stuffName: string;
  stuffPrice: number;
  imageUrl: string;
};

const Board = ({
  createAt,
  creator,
  id,
  stuffCategory,
  stuffName,
  stuffPrice,
  imageUrl,
}: Props) => {
  register('ko', koLocale);
  const { city, province } = creator;

  return (
    <div className={styles.board}>
      <div className={styles.userImage}>
        <Image data-id={id} src={imageUrl} alt="picture" fill />
      </div>
      <div data-id={id} className={styles.userInfo}>
        <div className={styles.profile}>
          <Image src={profile} alt="profile" fill />
        </div>
        <div className={styles.auctionInfo}>
          <p>{stuffName}</p>
          <div>
            <span>
              {province.name} {city.name} {stuffCategory}
            </span>
          </div>
          <strong>
            희망 가격 : <span>{stuffPrice}원</span>
          </strong>
        </div>
        <div className={styles.boardTime}>{format(createAt, 'ko')}</div>
      </div>
    </div>
  );
};

export default Board;
