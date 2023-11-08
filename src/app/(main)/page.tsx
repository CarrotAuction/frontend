import React from 'react';
import MainIntroduce from '@/src/components/MainIntroduce';
import Banner from '@/src/components/mainPage/Banner';
import styles from './index.module.scss';

export default function Home() {
  return (
    <main className={styles.main}>
      <Banner />
      <MainIntroduce />
    </main>
  );
}
