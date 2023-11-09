import React from 'react';
import Banner from '@/src/components/auctionPage/Banner';
import UserAuction from '@/src/components/auctionPage/UserAuction';
import styles from './index.module.scss';

const Auction = () => {
  return (
    <main className={styles.auction}>
      <Banner />
      <UserAuction />
    </main>
  );
};

export default Auction;
