import React from 'react';
import Image, { StaticImageData } from 'next/image';
import styles from './index.module.scss';

type Props = {
  productImageSrc: StaticImageData;
  productName: string;
};

const ProductInfoImageAndName = ({ productImageSrc, productName }: Props) => {
  return (
    <article className={styles.productInfoImageAndName}>
      <Image src={productImageSrc} width={200} alt="product image" />
      <p>{productName}</p>
    </article>
  );
};

export default ProductInfoImageAndName;
