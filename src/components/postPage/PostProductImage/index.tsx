'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import blankImage from '@/src/assets/post/blank.png';
import styles from './index.module.scss';

type PostProductImageProps = {
  image: string | null;
  handleImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const PostProductImage = ({ image, handleImage }: PostProductImageProps) => {
  const fileInput = useRef<HTMLInputElement>(null);

  const openFileInput = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  return (
    <div className={styles.postProductImage}>
      <div className={styles.uploadProductImage}>
        <Image
          src={image || blankImage}
          fill
          alt="프로필 이미지"
          onClick={openFileInput}
        />
        <input
          type="file"
          name="image_URL"
          id="input-file"
          accept="image/*"
          ref={fileInput}
          onChange={handleImage}
        />
      </div>
      <p>
        <label htmlFor="input-file">이미지 업로드</label>
      </p>
    </div>
  );
};

export default PostProductImage;
