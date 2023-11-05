import React from 'react';
import { IoMdClose } from 'react-icons/io';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './index.module.scss';

type Props = {
  changeToggle: () => void;
  toggle: boolean;
};

const navInitial = { x: '100%' };
const navAnimate = {
  x: 0,
  transition: {
    type: 'spring',
    stiffness: 400,
    damping: 20,
    duration: 0.1,
  },
};
const navExit = { x: '100%', transition: { duration: 0.1 } };

const NavBarSlide = ({ toggle, changeToggle }: Props) => {
  const handleOutSide = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      changeToggle();
    }
  };
  return (
    <AnimatePresence>
      {toggle && (
        <motion.section
          initial={navInitial}
          animate={navAnimate}
          exit={navExit}
          onClick={handleOutSide}
          className={styles.slide}
        >
          <aside>
            <div onClick={changeToggle} className={styles.closeIcon}>
              <IoMdClose size={32} />
            </div>
            <ul className={styles.navList}>
              <li>물건 보러가기</li>
              <li>글 쓰기</li>
              <li>로그인</li>
            </ul>
          </aside>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default NavBarSlide;
