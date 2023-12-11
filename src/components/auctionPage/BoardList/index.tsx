import { AllBoardType, BoardType } from '@/src/types/search';
import React from 'react';
import styles from './index.module.scss';
import Board from '../Board';

type Props = {
  Boards: AllBoardType;
};

const BoardList = ({ Boards }: Props) => {
  return (
    <div
      className={
        Boards?.boards?.length > 2 ? styles.userBoards : styles.shortUserBoards
      }
    >
      {Boards?.boards?.map((data: BoardType) => (
        <Board key={data.id} {...data} />
      ))}
    </div>
  );
};

export default BoardList;
