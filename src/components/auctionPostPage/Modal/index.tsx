import React, { useState } from 'react';
import { GiCancel } from 'react-icons/gi';
import useInput from '@/src/hooks/useInput';
import styles from './index.module.scss';

type Props = {
  handleModal: () => void;
};

const Modal = ({ handleModal }: Props) => {
  const [price, setPrice] = useInput();
  const [link, setLink, resetLink] = useInput();

  const handleBidding = () => {
    handleModal();
  };

  return (
    <div>
      <div className={styles.modalBackground} onClick={handleModal} />
      <form className={styles.modal}>
        <label htmlFor="price">가격을 입력해주세요.</label>
        <div className={styles.priceInputContainer}>
          <input onChange={setPrice} value={price} type="text" id="price" />
        </div>
        <label htmlFor="openChattingLink">오픈 채팅방 링크을 올려주세요.</label>
        <div className={styles.linkInputContainer}>
          <input
            onChange={setLink}
            value={link}
            type="text"
            id="openChattingLink"
          />
          {link && <GiCancel onClick={resetLink} className={styles.icon} />}
        </div>
        <button type="button" onClick={handleBidding}>
          확인
        </button>
      </form>
    </div>
  );
};

export default Modal;
