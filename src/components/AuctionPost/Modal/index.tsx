import React, { useState } from 'react';
import styles from './index.module.scss';

type Props = {
  handleModal: () => void;
};

const Modal = ({ handleModal }: Props) => {
  const [price, setPrice] = useState();
  const [openChattingLink, setOpenChattingLink] = useState();

  return (
    <div>
      <div className={styles.modalBackground} onClick={handleModal} />
      <form className={styles.modal}>
        <label htmlFor="price">가격을 입력해주세요.</label>
        <input onChange={setPrice} value={price} type="text" id="price" />
        <label htmlFor="openChattingLink">오픈 채팅방 링크을 올려주세요.</label>
        <input
          onChange={setOpenChattingLink}
          value={openChattingLink}
          type="text"
          id="openChattingLink"
        />
        <button type="button">확인</button>
      </form>
    </div>
  );
};

export default Modal;
