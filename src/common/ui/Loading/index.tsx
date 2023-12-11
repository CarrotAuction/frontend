import Image from 'next/image';
import React from 'react';
import loading from '../../../assets/auction/loading.gif';
import styles from './index.module.scss';

type Props = {
  width: string;
  height: string;
};

const Loading = ({ width, height }: Props) => {
  return (
    <div className={styles.loading}>
      <Image src={loading} width={+width} height={+height} alt="loading" />
    </div>
  );
};

export default Loading;
