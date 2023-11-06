import React from 'react';
import MainIntroduce from '@/src/components/MainIntroduce';
import Banner from '@/src/components/Banner';
import styles from './index.module.scss';

export default function Home() {
  return (
    <main>
      <Banner />
      <MainIntroduce />
    </main>
  );
}
