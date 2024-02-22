import React from 'react';
import MainIntroduce from '@/src/components/mainPage/MainIntroduce';
import Banner from '@/src/components/mainPage/Banner';
import AdvertisementModal from '@/src/components/auctionPage/AdvertisementModal';
import styles from './index.module.scss';

export default function Home() {
  return (
    <main className={styles.main}>
      <Banner />
      <MainIntroduce />
      <AdvertisementModal />
    </main>
  );
}
