'use client';

import useInput from '@/src/hooks/useInput';
import React, { useState } from 'react';
import { Area, Category } from '@/src/constants/search';
import { SelectValueType, ShowType } from '@/src/types/search';
import DataSearch from '../DataSearch';
import AreaSelect from '../AreaSelect';
import styles from './index.module.scss';
import CitySelect from '../CitySelect';
import CategorySelect from '../CategorySelect';

const FilterBox = () => {
  const [searchData, onchange] = useInput();

  const [selectValue, setSelectValue] = useState<SelectValueType>({
    area: '',
    city: '',
    category: '',
  });

  const [show, setShow] = useState<ShowType>({
    areaShow: false,
    cityShow: false,
    categoryShow: false,
  });

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
        <button className={styles.submit} type="button">
          검색
        </button>
      </section>
    </main>
  );
};

export default FilterBox;
