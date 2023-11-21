'use client';

import React from 'react';
import { AllBoardType, BoardType } from '@/src/types/search';
import Image from 'next/image';
import styles from './index.module.scss';
import Board from '../Board';
import emptyBox from '../../../assets/auction/empty.png';
import loading from '../../../assets/auction/loading.gif';
import Pagination from '../Pagination';

type Props = {
  Boards: AllBoardType;
  isPending: boolean;
  onChangePage: (page: number) => void;
  page: number;
};

const UserAuctionData = ({ Boards, isPending, onChangePage, page }: Props) => {
  if (isPending) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyBox}>
          <Image src={loading} alt="empty" fill />
        </div>
      </div>
    );
  }

  return (
    <main>
      {Boards?.boards.length === 0 ? (
        <div className={styles.empty}>
          <div className={styles.emptyBox}>
            <Image src={emptyBox} alt="empty" fill />
          </div>
          <span>아직 올라온 매물이 없어요 😞</span>
        </div>
      ) : (
        <>
          <div className={styles.userBoards}>
            {Boards?.boards?.map((data: BoardType) => {
              return <Board key={data.id} {...data} />;
            })}
          </div>
          <Pagination
            page={page}
            totalPages={Boards?.totalPages}
            onChangePage={onChangePage}
          />
        </>
      )}
    </main>
  );
};

export default UserAuctionData;
