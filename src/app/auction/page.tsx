import React from 'react';
import Banner from '@/src/components/auctionPage/Banner';
import styles from './index.module.scss';

const Auction = () => {
  return (
    <main className={styles.auction}>
      <Banner />
    </main>
  );
};

export default Auction;
