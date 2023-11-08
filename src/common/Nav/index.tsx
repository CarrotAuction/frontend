'use client';

import React, { useState } from 'react';
import NavBarSlide from '@/src/components/NavBarSlide';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import ToggleNavIcon from '../ui/ToggleNavIcon';
import carrot from '../../assets/main/carrot.png';
import styles from './index.module.scss';

const NavBar = () => {
  const router = useRouter();
  const [toggle, setToggle] = useState(false);

  const changeToggle = () => {
    setToggle((pre) => !pre);
  };

  return (
    <nav className={styles.nav}>
      <section className={styles.innerNav}>
        <div onClick={() => router.push('/')} className={styles.logo}>
          <div>
            <Image src={carrot} fill alt="logo" />
          </div>
          Carrot Auction
        </div>
        <div onClick={changeToggle} className={styles.toggleIcon}>
          {!toggle && <ToggleNavIcon />}
        </div>
        <ul className={styles.list}>
          <li>물건 보러가기</li>
          <li>글 쓰기</li>
          <li>로그인</li>
        </ul>
      </section>
      <NavBarSlide toggle={toggle} changeToggle={changeToggle} />
    </nav>
  );
};

export default NavBar;
