'use client';

import React, { useState } from 'react';
import styles from './index.module.scss';
import Board from '../Board';
import Pagination from '../Pagination';

const UserAuctionData = () => {
  const [page, setPage] = useState(1);
  const onChangePage = () => {
    setPage((pre) => pre + 1);
  };
  return (
    <main>
      <div className={styles.userBoards}>
        <Board />
        <Board />
        <Board />
        <Board />
        <Board />
        <Board />
      </div>
      <Pagination totalPages={10} onChangePage={onChangePage} />
    </main>
  );
};

export default UserAuctionData;
