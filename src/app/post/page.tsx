import React from 'react';
import PostProductImage from '@/src/components/postPage/PostProductImage';
import PostProductInfo from '@/src/components/postPage/PostProductInfo';
import styles from './index.module.scss';

const Post = () => {
  return (
    <main className={styles.postPage}>
      <h1 className={styles.title}>글 쓰기</h1>
      <div className={styles.postContent}>
        <PostProductImage />
        <PostProductInfo />
      </div>
    </main>
  );
};

export default Post;
