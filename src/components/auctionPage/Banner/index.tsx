import React from 'react';
import Image from 'next/image';
import money from '../../../assets/auction/money.png';
import styles from './index.module.scss';

const Baneer = () => {
  return (
    <main className={styles.banner}>
      <section className={styles.bannerBox}>
        <article className={styles.bannerText}>
          <h1>이웃 간 중고거래</h1>
          <p>
            동네 주민들과 가깝고 따뜻한 거래를
            <br />
            지금 경험해보세요!
          </p>
          <button type="button">매물 올리기</button>
        </article>
        <article className={styles.bannerImg}>
          <Image src={money} alt="money" fill />
        </article>
      </section>
    </main>
  );
};

export default Baneer;
