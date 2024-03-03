'use client';

import React, { useEffect, useState } from 'react';
import MainIntroduce from '@/src/components/mainPage/MainIntroduce';
import Banner from '@/src/components/mainPage/Banner';
import AdvertisementModal from '@/src/components/auctionPage/AdvertisementModal';
import { getCookie } from 'cookies-next';
import MainProducts from '@/src/components/mainPage/MainProducts';
import {
  useExpensiveProductBoard,
  useLikeProductBoard,
  useRecentProductBoard,
} from '@/src/remote/query/main';
import styles from './index.module.scss';

export default function Home() {
  const [open, setOpen] = useState(false);
  const modalCookie = getCookie('ad-modal');

  useEffect(() => {
    setOpen(!modalCookie);
  }, []);

  const { data: expensiveProducts } = useExpensiveProductBoard();
  const { data: recentProducts } = useRecentProductBoard();
  const { data: likeProudcts } = useLikeProductBoard();

  return (
    <main className={styles.main}>
      <Banner />
      <MainProducts title="인기 경매글 탑 4" data={likeProudcts} />
      <MainProducts title="가장 비싼 경매글 탑 4" data={expensiveProducts} />
      <MainProducts title="최근 경매글" data={recentProducts} />
      <MainIntroduce />
      {open && <AdvertisementModal setOpen={setOpen} />}
    </main>
  );
}
