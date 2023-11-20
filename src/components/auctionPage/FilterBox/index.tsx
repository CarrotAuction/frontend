'use client';

import React, { useState } from 'react';
import { Area, Category } from '@/src/constants/search';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import {
  CustomRefetchOptions,
  PropsBoards,
  SelectValueType,
  ShowType,
} from '@/src/types/search';
import DataSearch from '../DataSearch';
import AreaSelect from '../AreaSelect';
import styles from './index.module.scss';
import CitySelect from '../CitySelect';
import CategorySelect from '../CategorySelect';

type Props = {
  searchData: string;
  onchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectValue: SelectValueType;
  setSelectValue: React.Dispatch<React.SetStateAction<SelectValueType>>;
  refetch: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<PropsBoards>>;
  onChangePage: (page: number) => void;
};

const FilterBox = ({
  searchData,
  onchange,
  selectValue,
  setSelectValue,
  refetch,
  onChangePage,
}: Props) => {
  const [show, setShow] = useState<ShowType>({
    areaShow: false,
    cityShow: false,
    categoryShow: false,
  });

  const handleRefresh = () => {
    onChangePage(1);
    refetch() as CustomRefetchOptions;
  };

  return (
    <main className={styles.filterBox}>
      <section>
        <DataSearch searchData={searchData} onchange={onchange} />
      </section>
      <section className={styles.selects}>
        <div>
          <AreaSelect
            Area={Area}
            setSelectValue={setSelectValue}
            selectValue={selectValue}
            setShow={setShow}
            show={show}
          />
          <CitySelect
            Area={Area}
            setSelectValue={setSelectValue}
            selectValue={selectValue}
            setShow={setShow}
            show={show}
          />
          <CategorySelect
            Category={Category}
            setSelectValue={setSelectValue}
            selectValue={selectValue}
            setShow={setShow}
            show={show}
          />
        </div>
        <button onClick={handleRefresh} className={styles.submit} type="button">
          검색
        </button>
      </section>
    </main>
  );
};

export default FilterBox;
