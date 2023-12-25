'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import introduceP1 from '../../../assets/main/introduce1.png';
import introduceP2 from '../../../assets/main/introduce2.png';
import introduceP3 from '../../../assets/main/introduce3.png';
import blueIntroduce2 from '../../../assets/main/blurIntroduce2.png';
import blueIntroduce3 from '../../../assets/main/blueIntroduce3.png';
import styles from './index.module.scss';
import UseLazyLoading from './useLazyLoading';

const MainIntroduce = () => {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const imageRef2 = useRef<HTMLImageElement | null>(null);
  const textRef = useRef<HTMLElement | null>(null);
  const textRef2 = useRef<HTMLElement | null>(null);
  const textRef3 = useRef<HTMLElement | null>(null);

  const [view] = UseLazyLoading(imageRef);
  const [view2] = UseLazyLoading(imageRef2);
  const [show2] = UseLazyLoading(textRef2);
  const [show3] = UseLazyLoading(textRef3);

  console.log(view);
  console.log(view2);
  console.log(show2);
  return (
    <main className={styles.introduce}>
      <section className={styles.introBox}>
        <article ref={textRef} className={`${styles.introText} ${styles.init}`}>
          <p>Carrot Auction이 무엇인가요?</p>
          <p>중고 물품을 경매할 수 있어요</p>
          <span>
            당신에게 필요한 물품을 저렴하게 구매해보세요
            <br />
            어느 지역에서나 거래를 할 수 있어요
          </span>
        </article>
        <article className={styles.introImg}>
          <div className={styles.picture}>
            <Image priority src={introduceP1} fill alt="introduce" />
          </div>
        </article>
      </section>
      <section className={`${styles.introBox} ${styles.mobileFlexReverse}`}>
        <article className={styles.introImg}>
          <div ref={imageRef} className={styles.picture}>
            {view && (
              <Image
                className={styles.view}
                priority
                src={introduceP2}
                fill
                alt="introduce"
              />
            )}
          </div>
        </article>

        <article
          ref={textRef2}
          className={`${styles.introText} ${show2 && styles.show}`}
        >
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
        <article
          ref={textRef3}
          className={`${styles.introText} ${show3 && styles.show}`}
        >
          <p>어떤 점이 좋나요?</p>
          <p>매물을 늦게 발견해도 기회가 있어요!</p>
          <span>
            경매 참여자들이 제시한 금액을 확인할 수 있기 때문에
            <br />
            매물을 늦게 발견하더라도 더 높은 금액을 제시하여 구매할 수 있어요
          </span>
        </article>
        <article className={styles.introImg}>
          <div ref={imageRef2} className={styles.picture}>
            {view2 && (
              <Image
                className={styles.view}
                src={introduceP3}
                fill
                alt="introduce"
              />
            )}
          </div>
        </article>
      </section>
    </main>
  );
};

export default MainIntroduce;
