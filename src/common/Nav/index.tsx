import React from 'react';
import styles from './index.module.scss';
import ToggleNavIcon from '../ui/ToggleNavIcon';

const NavBar = () => {
  return (
    <nav className={styles.nav}>
      <section className={styles.innerNav}>
        <div className={styles.logo}>Carrot Auction</div>
        <ul className={styles.list}>
          <li>물건 보러가기</li>
          <li>글 쓰기</li>
          <li>로그인</li>
        </ul>
      </section>
      <ToggleNavIcon />
    </nav>
  );
};

export default NavBar;
