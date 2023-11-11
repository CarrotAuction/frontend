'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import NavBar from '../../common/Nav';
import styles from './page.module.scss';
import product from '../../assets/AuctionPost/product.png';
import userProfile from '../../assets/AuctionPost/userProfile.png';

const DUMMY = {
  userImage: userProfile,
  productImage: product,
  productName: '쿠루미 인형',
  postOwner: '가나다라',
  postOwnerAddress: {
    province: '경상남도',
    city: '창원시',
  },
  desiredPrice: 3000,
  productCategory: '완구/취미',
  productInfo: '귀여워요. 1년 전에 구매했어요.',
  comments: [
    {
      nickname: '배고픈사람',
      auctionPrice: 2600,
      openChattingLink: 'https://open.kakao.com/~~~',
      date: '1시간 전',
    },
    {
      nickname: '쿠루미콜렉터',
      auctionPrice: 2500,
      openChattingLink: 'https://open.kakao.com/~~~',
      date: '2시간 전',
    },
    {
      nickname: '인형에미친자',
      auctionPrice: 2000,
      openChattingLink: 'https://open.kakao.com/~~~',
      date: '3시간 전',
    },
  ],
  isAuctionOver: false,
};

export default function AuctionPost() {
  const loginedNickname = '가나다';

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <NavBar />
      <section className={styles.auctionProduct}>
        <article className={styles.productInfo}>
          <Image src={DUMMY.productImage} width={250} alt="product image" />
          <p>{DUMMY.productName}</p>
        </article>
        <article className={styles.productInfoDetail}>
          <div>
            <Image src={DUMMY.userImage} width={40} alt="product image" />
            <span>{DUMMY.postOwner}</span>
          </div>
          <p>{`${DUMMY.postOwnerAddress.province} ${DUMMY.postOwnerAddress.city}`}</p>
          <p>{DUMMY.productCategory}</p>
          <p>{`희망 가격: ${DUMMY.desiredPrice.toLocaleString('ko-KR')}원`}</p>
          <button type="button" className={styles.auctionParticipateButton}>
            {loginedNickname === DUMMY.postOwner
              ? '판매 종료'
              : '경매 참여하기'}
          </button>
        </article>
      </section>
      <section className={styles.postComments}>
        <p>{`경매 참여 현황: ${DUMMY.comments.length}`}</p>
        <hr />
        {DUMMY.comments.map((comment) => (
          <article className={styles.comment}>
            <div className={styles.commentDetail}>
              <div>
                <span>{comment.nickname}</span>
                <span>{comment.date}</span>
              </div>
              <span>{comment.openChattingLink}</span>
            </div>
            <div className={styles.commentOfPrice}>
              <span>{`${comment.auctionPrice.toLocaleString('ko-KR')}원`}</span>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
