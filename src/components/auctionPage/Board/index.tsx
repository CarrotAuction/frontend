/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import Image from 'next/image';
import carrot from '../../../assets/main/footer_carrot.png';
import profile from '../../../assets/auction/profile.jpg';
import styles from './index.module.scss';

const Board = () => {
  return (
    <div className={styles.board}>
      <div className={styles.userImage}>
        <Image src={profile} alt="picture" fill />
      </div>
      <div className={styles.userInfo}>
        <div className={styles.profile}>
          <Image src={profile} alt="profile" fill />
        </div>
        <div className={styles.auctionInfo}>
          <p>쿠루미 인형</p>
          <div>
            <span>서울</span>
            <span>전자제품</span>
          </div>
          <strong>
            희망 가격 : <span>3000원</span>
          </strong>
        </div>
        <div className={styles.boardTime}>3일 전</div>
      </div>
    </div>
  );
};

export default Board;
