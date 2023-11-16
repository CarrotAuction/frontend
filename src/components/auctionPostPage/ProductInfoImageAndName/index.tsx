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
      <Image src={productImageSrc} fill alt="product image" />
    </article>
  );
};

export default ProductInfoImageAndName;
