import React from 'react';
import FilterBox from '../FilterBox';
import styles from './index.module.scss';
import UserAuctionData from '../UserAuctionData';

const UserAuction = () => {
  return (
    <main className={styles.auction}>
      <FilterBox />
      <UserAuctionData />
    </main>
  );
};

export default UserAuction;
