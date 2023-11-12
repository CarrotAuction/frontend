import React, { useState } from 'react';
import Image from 'next/image';
import styles from './index.module.scss';
import Modal from '../Modal';

type Props = {
  userImageSrc: any;
  postOwner: any;
  postOwnerProvince: string;
  postOwnerCity: string;
  productCategory: string;
  productFeature: string;
  desiredPrice: number;
  isAuctionOver: boolean;
  loginedNickname: string;
};

const ProductInfoDetail = ({
  userImageSrc,
  postOwner,
  postOwnerProvince,
  postOwnerCity,
  productCategory,
  productFeature,
  desiredPrice,
  isAuctionOver,
  loginedNickname,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleModal = () => {
    setIsOpen((pre) => !pre);
  };

  return (
    <article className={styles.productInfoDetail}>
      <div>
        <Image src={userImageSrc} width={40} alt="user image" />
        <p>
          <span>{postOwner}</span>
        </p>
      </div>
      <p>{`${postOwnerProvince} ${postOwnerCity}`}</p>
      <p>{productCategory}</p>
      <p>{productFeature}</p>
      <p>{`희망 가격: ${desiredPrice.toLocaleString('ko-KR')}원`}</p>
      <button
        type="button"
        className={styles.auctionParticipateButton}
        disabled={isAuctionOver}
        onClick={handleModal}
      >
        {loginedNickname === postOwner ? '판매 종료' : '경매 참여하기'}
      </button>
      {isOpen && <Modal handleModal={handleModal} />}
    </article>
  );
};

export default ProductInfoDetail;
