'use client';

import React, { useEffect, useState } from 'react';
import NavBarSlide from '@/src/components/NavBarSlide';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { deleteCookie, getCookie } from 'cookies-next';
import Swal from 'sweetalert2';
import ToggleNavIcon from '../ui/ToggleNavIcon';
import styles from './index.module.scss';
import carrot from '../../assets/main/carrot.png';

const NavBar = () => {
  const router = useRouter();
  const path = usePathname();
  const [toggle, setToggle] = useState(false);

  const [btnWord, setBtnWord] = useState('');

  const token = getCookie('token');

  const changeToggle = () => {
    setToggle((pre) => !pre);
  };

  const onClickHandler = () => {
    if (token) {
      deleteCookie('token');
      Swal.fire({
        icon: 'success',
        title: '로그아웃 성공',
      });
      router.refresh();
    } else {
      router.push('/login');
    }
  };

  useEffect(() => {
    if (token) {
      setBtnWord('로그아웃');
    } else {
      setBtnWord('로그인');
    }
  }, [token]);

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
          <li
            onClick={onClickHandler}
            className={path === '/login' ? styles.point : styles.nonPoint}
          >
            {btnWord}
          </li>
        </ul>
      </section>
      <NavBarSlide toggle={toggle} changeToggle={changeToggle} />
    </nav>
  );
};

export default NavBar;
