import React, { useState, useRef } from 'react';
import { GiCancel } from 'react-icons/gi';
import styles from './index.module.scss';

type Props = {
  tag: string;
  changeFunction: (e: React.ChangeEvent<any>) => void;
  value: string;
  name: string;
  placeholder: string;
  resetFunction: () => void;
};

const InputBox = ({
  tag,
  changeFunction,
  value,
  name,
  placeholder,
  resetFunction,
}: Props) => {
  return (
    <div className={styles.inputBox}>
      {tag === 'input' ? (
        <input
          onChange={changeFunction}
          value={value}
          name={name}
          type="text"
          placeholder={placeholder}
        />
      ) : (
        <textarea
          className={styles.detailTextarea}
          rows={10}
          value={value}
          name={name}
          onChange={changeFunction}
          placeholder={placeholder}
        />
      )}
      {value && (
        <GiCancel
          data-testid="id-icon"
          onClick={resetFunction}
          className={
            tag === 'input'
              ? `${styles.icon}`
              : `${styles.icon} ${styles.productDetailResetIcon}`
          }
        />
      )}
    </div>
  );
};

export default InputBox;
