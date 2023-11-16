'use client';

import React from 'react';
import ProductInfo from '@/src/components/auctionPostPage/ProductInfo';
import CommentContainer from '../../components/auctionPostPage/CommentContainer';
import styles from './page.module.scss';
import product from '../../assets/AuctionPost/product.png';
import userProfile from '../../assets/AuctionPost/userProfile.png';

const DUMMY = {
  userImage: userProfile,
  productImage: product,
  productName: '쿠루미 인형',
  postOwner: '가나다라',
  postOwnerProvince: '경상남도',
  postOwnerCity: '창원시',
  desiredPrice: 3000,
  productCategory: '완구/취미',
  productFeature: '귀여워요. 1년 전에 구매했어요.',
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
    <main className={styles.auctionPost}>
      <ProductInfo productInfo={DUMMY} loginedNickname={loginedNickname} />
      <CommentContainer comments={DUMMY.comments} />
    </main>
  );
}
