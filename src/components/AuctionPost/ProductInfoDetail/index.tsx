import React from 'react';
import Image from 'next/image';
import styles from './index.module.scss';

type Props = {
  userImageSrc: string;
  postOwner: string;
  postOwnerProvince: string;
  postOwnerCity: string;
  productCategory: string;
  productFeature: string;
  desiredPrice: number;
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
  loginedNickname,
}: Props) => {
  return (
    <article className={styles.productInfoDetail}>
      <div>
        <Image src={userImageSrc} width={40} alt="product image" />
        <p>
          <span>{postOwner}</span>
        </p>
      </div>
      <p>{`${postOwnerProvince} ${postOwnerCity}`}</p>
      <p>{productCategory}</p>
      <p>{productFeature}</p>
      <p>{`희망 가격: ${desiredPrice.toLocaleString('ko-KR')}원`}</p>
      <button type="button" className={styles.auctionParticipateButton}>
        {loginedNickname === postOwner ? '판매 종료' : '경매 참여하기'}
      </button>
    </article>
  );
};

export default ProductInfoDetail;
