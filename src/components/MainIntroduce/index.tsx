'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import introduceP1 from '../../assets/main/introduce1.png';
import introduceP2 from '../../assets/main/introduce2.png';
import introduceP3 from '../../assets/main/introduce3.png';
import styles from './index.module.scss';

const MainIntroduce = () => {
  // const ref = useRef(null);
  // const ref2 = useRef(null);
  // useEffect(() => {
  //   if (ref.current && ref2.current) {
  //     const observer = new IntersectionObserver(
  //       (entries: IntersectionObserverEntry[]) => {
  //         entries.forEach((entry: IntersectionObserverEntry) => {
  //           if (entry.isIntersecting) {
  //             console.log(entry);
  //           }
  //         });
  //       },
  //       {},
  //     );
  //     observer.observe(ref.current);
  //     observer.observe(ref2.current);
  //     return () => observer.disconnect();
  //   }
  //   return () => undefined;
  // }, [ref]);

  return (
    <main className={styles.introduce}>
      <section className={styles.introBox}>
        <article className={styles.introText}>
          <p>Carrot Auction이 무엇인가요?</p>
          <p>도움이 필요한 당신, 지금 나에게 필요한 것은?</p>
          <span>
            이어드림에서 당신에게 필요한 모든것을 해결해보세요 간편하게
            <br />
            상담예약하고 채팅과 전화로 무엇이든 물어볼수있어요
          </span>
        </article>
        <article className={styles.introImg}>
          <div className={styles.picture}>
            <Image src={introduceP1} fill alt="introduce" />
          </div>
        </article>
      </section>
      <section className={`${styles.introBox} ${styles.mobileFlexReverse}`}>
        <article className={styles.introImg}>
          <div className={styles.picture}>
            <Image src={introduceP2} fill alt="introduce" />
          </div>
        </article>
        <article className={styles.introText}>
          <p>무엇을 할 수 있나요?</p>
          <p>우리 동네 사람과 소통해요</p>
          <span>
            Carrot Auction에서는 같은 지역 사람들과 원하는 물건들을
            <br />
            경매 형식으로 사고 팔 수 있어요
          </span>
        </article>
      </section>
      <section className={styles.introBox}>
        <article className={styles.introText}>
          <p>어떤 점이 좋나요?</p>
          <p>매물을 늦게 발견해도 기회가 있어요!</p>
          <span>
            경매 참여자들이 제시한 금액을 확인할 수 있기 때문에
            <br />
            매물을 늦게 발견하더라도 더 높은 금액을 제시하여 구매할 수 있어요
          </span>
        </article>
        <article className={styles.introImg}>
          <div className={styles.picture}>
            <Image src={introduceP3} fill alt="introduce" />
          </div>
        </article>
      </section>
    </main>
  );
};

export default MainIntroduce;
