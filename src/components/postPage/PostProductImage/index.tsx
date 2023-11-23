'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import blankImage from '@/src/assets/post/blank.png';
import UsePreview from '@/src/hooks/usePreview';
import styles from './index.module.scss';

type PostProductImageProps = {
  onImageSelect: (imageFile: any) => void;
};

const PostProductImage = ({ onImageSelect }: PostProductImageProps) => {
  const fileInput = useRef<HTMLInputElement>(null);

  const { file, image, handleImage } = UsePreview();

  const openFileInput = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  useEffect(() => {
    onImageSelect(file);
  }, [file, onImageSelect]);

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
