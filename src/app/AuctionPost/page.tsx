import React from 'react';
import Image from 'next/image';
import NavBar from '../../common/Nav';
import styles from './page.module.scss';

export default function AuctionPost() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <NavBar />
      <div className={styles.auctionProduct}>
        <div className={styles.productDetail1}>
          <Image
            src="/src/assets/product.png"
            width={300}
            height={300}
            alt="product image"
          />
          <p>product name</p>
        </div>
        <div className={styles.productDetail2}>
          <p>publisher name</p>
          <p>category</p>
          <p>wish price</p>
          <button type="button">경매 참여하기</button>
        </div>
      </div>
      <div className={styles.postComments}>
        <div className={styles.comment}>
          <div className={styles.commentDetail}>
            <div>
              <span>comment publisher name</span>
              <span>comment date</span>
            </div>
            <span>open chatting link</span>
          </div>
          <div className={styles.commentOfPrice}>
            <span>price</span>
          </div>
        </div>
      </div>
    </main>
  );
}
