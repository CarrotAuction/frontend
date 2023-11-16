import React from 'react';
import { StaticImageData } from 'next/image';
import styles from './index.module.scss';
import ProductInfoImageAndName from '../ProductInfoImageAndName';
import ProductInfoDetail from '../ProductInfoDetail';

type ProductInfoType = {
  userImage: StaticImageData;
  productImage: StaticImageData;
  productName: string;
  postOwner: string;
  postOwnerProvince: string;
  postOwnerCity: string;
  productCategory: string;
  productFeature: string;
  desiredPrice: number;
  isAuctionOver: boolean;
};

type Props = {
  productInfo: ProductInfoType;
  loginedNickname: string;
};

const ProductInfo = ({ productInfo, loginedNickname }: Props) => {
  return (
    <section className={styles.productInfo}>
      <ProductInfoImageAndName
        productImageSrc={productInfo.productImage}
        productName={productInfo.productName}
      />
      <ProductInfoDetail
        userImageSrc={productInfo.userImage}
        postOwner={productInfo.postOwner}
        postOwnerProvince={productInfo.postOwnerProvince}
        postOwnerCity={productInfo.postOwnerCity}
        productCategory={productInfo.productCategory}
        productFeature={productInfo.productFeature}
        desiredPrice={productInfo.desiredPrice}
        isAuctionOver={productInfo.isAuctionOver}
        loginedNickname={loginedNickname}
      />
    </section>
  );
};

export default ProductInfo;
