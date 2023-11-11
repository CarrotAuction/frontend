import React from 'react';
import Image from 'next/image';
import wallet from '../../../assets/main/wallet.gif';
import styles from './index.module.scss';

const Baneer = () => {
  return (
    <main className={styles.banner}>
      <section className={styles.bannerBox}>
        <article className={styles.bannerText}>
          <h1>물건 경매 사이트</h1>
          <p>
            쓸모가 없어졌지만 버리긴 아까운 물건,
            <br />
            희귀한 물건 등 모두 경매를 통해 처분하세요!
          </p>
          <button type="button">매물 보러가기</button>
        </article>
        <article className={styles.bannerImg}>
          <Image src={wallet} alt="wallet" fill />
        </article>
      </section>
    </main>
  );
};

export default Baneer;
