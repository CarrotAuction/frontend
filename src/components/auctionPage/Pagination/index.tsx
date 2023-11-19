import React from 'react';
import ReactPaginate from 'react-paginate';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import styles from './index.module.scss';

type PaginationProps = {
  onChangePage: (page: number) => void;
  totalPages: number;
};

function Pagination({ onChangePage, totalPages }: PaginationProps) {
  return (
    <div>
      <ReactPaginate
        className={styles.pagination}
        pageCount={totalPages}
        pageRangeDisplayed={5}
        marginPagesDisplayed={1}
        onPageChange={({ selected }) => onChangePage(selected + 1)}
        previousLabel={<FaArrowLeft />}
        nextLabel={<FaArrowRight />}
      />
    </div>
  );
}

export default Pagination;
