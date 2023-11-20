import React, { useState, useRef } from 'react';
import Image, { StaticImageData } from 'next/image';
import blankImage from '@/src/assets/post/blank.png';
import styles from './index.module.scss';

const PostProductImage = () => {
  const [image, setImage] = useState(blankImage);
  const fileInput: React.MutableRefObject<null> = useRef(null);
  const handleImage = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event: any) => {
      if (reader.readyState === 2) {
        // 파일 onLoad가 성공하면 2, 진행 중은 1, 실패는 0 반환
        setImage(event.target.result);
      }
    };
  };

  return (
    <div className={styles.postProductImage}>
      <div className={styles.uploadProductImage}>
        <Image src={image} fill alt="프로필 이미지" />
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
