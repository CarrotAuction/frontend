'use client';

import React, { useEffect, useState } from 'react';
import useWindowSize from '@/src/hooks/useWindow';
import NavBarSlide from '@/src/components/NavBarSlide';
import { useRouter } from 'next/navigation';
import ToggleNavIcon from '../ui/ToggleNavIcon';
import styles from './index.module.scss';

const NavBar = () => {
  const router = useRouter();
  const [window, windowEventListener] = useWindowSize();
  const [toggle, setToggle] = useState(false);

  const changeToggle = () => {
    setToggle((pre) => !pre);
  };

  useEffect(() => {
    windowEventListener();
  }, []);

  return (
    <nav className={styles.nav}>
      <section className={styles.innerNav}>
        <div onClick={() => router.push('/')} className={styles.logo}>
          Carrot Auction
        </div>
        {window.width <= 500 ? (
          <div onClick={changeToggle} className={styles.toggleIcon}>
            {!toggle && <ToggleNavIcon />}
          </div>
        ) : (
          <ul className={styles.list}>
            <li>물건 보러가기</li>
            <li>글 쓰기</li>
            <li>로그인</li>
          </ul>
        )}
      </section>
      <NavBarSlide toggle={toggle} changeToggle={changeToggle} />
    </nav>
  );
};

export default NavBar;
