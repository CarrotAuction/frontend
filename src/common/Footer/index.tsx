import React from 'react';
import Image from 'next/image';
import carrot from '../../assets/main/carrot.png';
import styles from './index.module.scss';

const Footer = () => {
  return (
    <section className={styles.footer}>
      <div className={styles.innerFooter}>
        <aside>
          <div>
            <div>
              <Image src={carrot} alt="carrot_img" fill />
            </div>
            <h1>Carrot Auction</h1>
          </div>
          <div className={styles.introduce}>
            <p>2023 SV TECHEER PROJECT BY TEAM CARROT_AUCTION </p>
          </div>
        </aside>
        <aside />
      </div>
    </section>
  );
};

export default Footer;
