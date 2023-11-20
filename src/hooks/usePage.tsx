import { useState } from 'react';

const INIT_PAGE_NUMBER = 1;

export default function usePage() {
  const [page, setPage] = useState(INIT_PAGE_NUMBER);

  const onChangePage = (page: number) => {
    setPage(page);
  };

  return { page, onChangePage, setPage };
}
