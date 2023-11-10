'use client';

import React, { useState } from 'react';
import NavBarSlide from '@/src/components/NavBarSlide';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import ToggleNavIcon from '../ui/ToggleNavIcon';
import carrot from '../../assets/main/carrot.png';
import styles from './index.module.scss';

const NavBar = () => {
  const router = useRouter();
  const path = usePathname();
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
          <li>
            <Link
              href="/auction"
              className={path === '/auction' ? styles.point : styles.nonPoint}
            >
              물건 보러가기
            </Link>
          </li>
          <li>글 쓰기</li>
          <li>
            <Link
              href="/login"
              className={path === '/login' ? styles.point : styles.nonPoint}
            >
              로그인
            </Link>
          </li>
        </ul>
      </section>
      <NavBarSlide toggle={toggle} changeToggle={changeToggle} />
    </nav>
  );
};

export default NavBar;
