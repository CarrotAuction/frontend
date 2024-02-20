import React from 'react';
import { GiCancel } from 'react-icons/gi';
import Swal from 'sweetalert2';
import useInput from '@/src/hooks/useInput';
import { usePostComment } from '@/src/remote/query/auctionDetail';
import styles from './index.module.scss';

type Props = {
  handleModal: () => void;
  creatorId: string | undefined;
  boardId: number;
  // refetch: (
  //   options?: RefetchOptions,
  // ) => Promise<QueryObserverResult<ProductInfoType>>;
};

const Modal = ({ handleModal, creatorId, boardId }: Props) => {
  const [price, setPrice, resetPrice] = useInput();
  const [openChatUrl, setOpenChatUrl, resetOpenChatUrl] = useInput();

  const { mutate } = usePostComment(refetch);

  const handleBidding = async () => {
    if (price === '' || openChatUrl === '') {
      Swal.fire({
        icon: 'warning',
        title: '경매 참여 정보를 모두 입력해 주세요.',
      });
      return;
    }

    mutate({
      price: Number(price),
      openChatUrl,
      boardId,
      creatorId: Number(creatorId),
    });

    resetPrice();
    resetOpenChatUrl();
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
