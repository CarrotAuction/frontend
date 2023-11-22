import React, { useState } from 'react';
import { CategoryType, SelectValueType, ShowType } from '@/src/types/search';
import styles from './index.module.scss';
import Options from '../Options';

type Props = {
  Category: CategoryType[];
  setSelectValue: React.Dispatch<React.SetStateAction<SelectValueType>>;
  selectValue: SelectValueType;
  setShow: React.Dispatch<React.SetStateAction<ShowType>>;
  show: ShowType;
};

const CategorySelect = ({
  Category,
  setSelectValue,
  selectValue,
  setShow,
  show,
}: Props) => {
  const clickOption = () => {
    setShow((pre) => {
      return {
        areaShow: false,
        cityShow: false,
        categoryShow: !pre.categoryShow,
      };
    });
  };

  return (
    <div onClick={clickOption} className={styles.selectBox}>
      <div>{selectValue.category || '카테고리'}</div>
      <div className={styles.line} />
      <div className={styles.caret} />
      {show.categoryShow && (
        <Options
          title="카테고리"
          option={Category}
          setSelectValue={setSelectValue}
        />
      )}
    </div>
  );
};

export default CategorySelect;
