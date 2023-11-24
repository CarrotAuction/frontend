import React, { useState } from 'react';
import { GiCancel } from 'react-icons/gi';
import { Comment } from '@/src/types/comment';
import { PostComment } from '@/src/apis/Comment';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Swal from 'sweetalert2';
import useInput from '@/src/hooks/useInput';
import { format, register } from 'timeago.js';
import koLocale from 'timeago.js/lib/lang/ko';
import styles from './index.module.scss';

type Props = {
  handleModal: () => void;
  creatorId: string | undefined;
  boardId: number;
};

const Modal = ({ handleModal, creatorId, boardId }: Props) => {
  const [price, setPrice] = useInput();
  const [openChatUrl, setOpenChatUrl, resetOpenChatUrl] = useInput();

  const { mutate } = useMutation({
    mutationFn: (data: Comment) => PostComment(data),
    onSuccess: (data) => {
      Swal.fire({
        icon: 'success',
        title: '경매 참여 완료!',
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error?.response?.data?.message) {
          Swal.fire({
            icon: 'error',
            title: `${error.response.data.message}`,
          });
        }
      }
    },
  });
  const handleBidding = () => {
    if (price === '' || openChatUrl === '') {
      Swal.fire({
        icon: 'warning',
        title: '경매 참여 정보를 모두 입력해 주세요.',
      });
      return;
    }
    const data = {
      price: Number(price),
      openChatUrl,
      boardId,
      creatorId: Number(creatorId),
    };
    mutate(data);
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
            onChange={setOpenChatUrl}
            value={openChatUrl}
            type="text"
            id="openChattingLink"
          />
          {openChatUrl && (
            <GiCancel onClick={resetOpenChatUrl} className={styles.icon} />
          )}
        </div>
        <button type="button" onClick={handleBidding}>
          확인
        </button>
      </form>
    </div>
  );
};

export default Modal;
