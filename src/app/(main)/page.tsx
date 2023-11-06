import React from 'react';
import MainIntroduce from '@/src/components/MainIntroduce';
import styles from './index.module.scss';

export default function Home() {
  return (
    <main>
      <div className={styles.dummy}>d</div>
      <MainIntroduce />
    </main>
  );
}
