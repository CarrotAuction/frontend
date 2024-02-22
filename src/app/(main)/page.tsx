'use client';

import React, { useEffect, useState } from 'react';
import MainIntroduce from '@/src/components/mainPage/MainIntroduce';
import Banner from '@/src/components/mainPage/Banner';
import AdvertisementModal from '@/src/components/auctionPage/AdvertisementModal';
import { getCookie } from 'cookies-next';
import styles from './index.module.scss';

export default function Home() {
  const [open, setOpen] = useState(false);
  const modalCookie = getCookie('ad-modal');

  useEffect(() => {
    setOpen(!modalCookie);
  }, []);

  return (
    <main className={styles.main}>
      <Banner />
      <MainIntroduce />
      {open && <AdvertisementModal setOpen={setOpen} />}
    </main>
  );
}
