'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { deleteCookie, getCookie } from 'cookies-next';
import Swal from 'sweetalert2';
import ToggleNavIcon from '../Ui/ToggleNavIcon';
import NavBarSlide from './NavBarSlide';
import styles from './index.module.scss';
import carrot from '../../assets/main/carrot.png';

const NavBar = () => {
  const router = useRouter();
  const path = usePathname();
  const [toggle, setToggle] = useState(false);
  const [myToken, setMyToken] = useState('');

  const [btnWord, setBtnWord] = useState('');

  const token = getCookie('token');

  const changeToggle = () => {
    setToggle((pre) => !pre);
  };

  const alertLogin = () => {
    Swal.fire({
      icon: 'warning',
      title: '로그인 후 이용 가능합니다!',
    });
    router.push('/login');
  };

  const logout = () => {
    deleteCookie('token');
    Swal.fire({
      icon: 'success',
      title: '로그아웃 성공',
    });
    setMyToken('');
    router.push('/');
  };

  useEffect(() => {
    token && setMyToken(token);
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
          {myToken ? (
            <li>
              <Link
                href="/post"
                className={path === '/post' ? styles.point : styles.nonPoint}
              >
                글 쓰기
              </Link>
            </li>
          ) : (
            <li onClick={alertLogin}>글 쓰기</li>
          )}
          {myToken ? (
            <li onClick={logout}>로그아웃</li>
          ) : (
            <li>
              <Link
                href="/login"
                className={path === '/login' ? styles.point : styles.nonPoint}
              >
                로그인
              </Link>
            </li>
          )}
        </ul>
      </section>
      <NavBarSlide toggle={toggle} changeToggle={changeToggle} />
    </nav>
  );
};

export default NavBar;
