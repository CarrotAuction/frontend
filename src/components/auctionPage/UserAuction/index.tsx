'use client';

import React, { useEffect, useState } from 'react';
import useInput from '@/src/hooks/useInput';
import { SelectValueType } from '@/src/types/search';
import usePage from '@/src/hooks/usePage';
import {
  QueryClient,
  keepPreviousData,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { GetBoards } from '@/src/apis/Auction';
import FilterBox from '../FilterBox';
import styles from './index.module.scss';
import UserAuctionData from '../UserAuctionData';

const UserAuction = () => {
  const [searchData, onchange] = useInput();
  const { page, onChangePage } = usePage();
  const [selectValue, setSelectValue] = useState<SelectValueType>({
    area: '',
    city: '',
    category: '',
  });

  const {
    isLoading,
    data: Boards,
    refetch,
  } = useQuery({
    queryKey: ['Boards', page] as const,
    queryFn: ({ queryKey }) => {
      const page = queryKey[1];
      const data = { ...selectValue, searchData, page };
      return GetBoards(data);
    },
    staleTime: 0,
    gcTime: 0,
    placeholderData: keepPreviousData,
  });

  // const fetchBoardList = (page: number) => {
  //   const data = { ...selectValue, searchData, page };

  //   return GetBoards(data);
  // };

  // const prefetchNextPosts = async (nextPage: number) => {
  //   const queryClient = new QueryClient();
  //   await queryClient.prefetchQuery({
  //     queryKey: ['Boards', nextPage],
  //     queryFn: () => fetchBoardList(nextPage + 1),
  //   });
  // };

  // useEffect(() => {
  //   if (page < Boards?.totalPages) {
  //     prefetchNextPosts(page);
  //   }
  // }, [page]);

  return (
    <main className={styles.auction}>
      <FilterBox
        refetch={refetch}
        searchData={searchData}
        onchange={onchange}
        selectValue={selectValue}
        setSelectValue={setSelectValue}
        onChangePage={onChangePage}
      />
      <UserAuctionData
        page={page}
        Boards={Boards}
        isLoading={isLoading}
        onChangePage={onChangePage}
      />
    </main>
  );
};

export default UserAuction;
