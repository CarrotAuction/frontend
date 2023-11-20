import React from 'react';
import ReactPaginate from 'react-paginate';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import styles from './index.module.scss';

type PaginationProps = {
  onChangePage: (page: number) => void;
  totalPages: number;
  page: number;
};

function Pagination({ onChangePage, totalPages, page }: PaginationProps) {
  return (
    <div>
      <ReactPaginate
        className={`${styles.pagination} ${
          page === 1 ? styles.Pagination_pagination__cjT7I : undefined
        } `}
        pageCount={totalPages}
        pageRangeDisplayed={5}
        marginPagesDisplayed={5}
        onPageChange={({ selected }) => onChangePage(selected + 1)}
        previousLabel={<FaArrowLeft />}
        nextLabel={<FaArrowRight />}
        activeClassName={page === 1 ? undefined : styles.activePage}
      />
    </div>
  );
}

export default Pagination;
