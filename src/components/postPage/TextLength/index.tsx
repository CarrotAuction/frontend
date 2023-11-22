import React from 'react';
import styles from './index.module.scss';

type Props = {
  value: string;
};

const TextLength = ({ value }: Props) => {
  return (
    <div className={styles.text}>
      <span>{value.length || 0}/200</span>
    </div>
  );
};

export default TextLength;
