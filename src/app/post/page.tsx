'use client';

import React, { useState } from 'react';
import PostProductImage from '@/src/components/postPage/PostProductImage';
import PostProductInfo from '@/src/components/postPage/PostProductInfo';
import UsePreview from '@/src/hooks/usePreview';
import styles from './index.module.scss';

const Post = () => {
  const { file, image, handleImage } = UsePreview();

  return (
    <main className={styles.postPage}>
      <h1 className={styles.title}>글 쓰기</h1>
      <div className={styles.postContent}>
        <PostProductImage image={image} handleImage={handleImage} />
        <PostProductInfo file={file} />
      </div>
    </main>
  );
};

export default Post;
