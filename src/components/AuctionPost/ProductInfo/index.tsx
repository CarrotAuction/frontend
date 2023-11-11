import React from 'react';
import styles from './index.module.scss';
import ProductInfoImageAndName from '../ProductInfoImageAndName';
import ProductInfoDetail from '../ProductInfoDetail';
import Product from '../../../assets/AuctionPost/product.png';

type Props = {
  productInfo: object;
  loginedNickname: string;
};

const ProductInfo = ({ productInfo }: Props) => {
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
        loginedNickname={productInfo.loginedNickname}
      />
    </section>
  );
};

export default ProductInfo;
