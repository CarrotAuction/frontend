import React, { useCallback, useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import styles from './index.module.scss';

type PaginationProps = {
  onChangePage: (page: number) => void;
  totalPages: number;
  page: number;
};
const LIMIT = 5;
function Pagination({ onChangePage, totalPages, page }: PaginationProps) {
  const [currentPage, setCurrentPage] = useState<number[]>([]);

  const initPageNumber = (totalPages: number, page: number) => {
    const viewPages = [];
    for (let i = page; i <= Math.min(page - 1 + LIMIT, totalPages); i += 1) {
      viewPages.push(i);
    }
    setCurrentPage(viewPages);
  };

  const prePages = () => {
    onChangePage(currentPage[0] - 5);
    initPageNumber(totalPages, currentPage[0] - 5);
  };

  const nextPages = () => {
    onChangePage(currentPage[0] + 5);
    initPageNumber(totalPages, currentPage[0] + 5);
  };

  useEffect(() => {
    initPageNumber(totalPages, page);
  }, [totalPages]);

  return (
    <div className={styles.pagination}>
      <button disabled={currentPage[0] === 1} onClick={prePages} type="button">
        <FaArrowLeft color="#f57a00" />
      </button>
      <ul>
        {currentPage?.map((v) => {
          return (
            <li
              className={v === page ? styles.activePage : undefined}
              onClick={() => onChangePage(v)}
              key={v}
            >
              {v}
            </li>
          );
        })}
      </ul>
      <button
        disabled={currentPage[currentPage.length - 1] === totalPages}
        onClick={nextPages}
        type="button"
      >
        <FaArrowRight color="#f57a00" />
      </button>
    </div>
  );
}

export default Pagination;
