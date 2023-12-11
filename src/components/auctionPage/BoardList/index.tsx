import { AllBoardType, BoardType } from '@/src/types/search';
import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './index.module.scss';
import Board from '../Board';

type Props = {
  Boards: AllBoardType;
};

const BoardList = ({ Boards }: Props) => {
  const router = useRouter();

  const gotoDetailBoard = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const boardId = target.dataset.id;
    router.push(`/auction/${boardId}`);
  };
  return (
    <div
      onClick={gotoDetailBoard}
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
