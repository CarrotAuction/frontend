import React, { useState } from 'react';
import { SelectOption, SelectValueType, ShowType } from '@/src/types/search';
import styles from './index.module.scss';
import Options from '../Options';

type Props = {
  Area: SelectOption[];
  setSelectValue: React.Dispatch<React.SetStateAction<SelectValueType>>;
  selectValue: SelectValueType;
  setShow: React.Dispatch<React.SetStateAction<ShowType>>;
  show: ShowType;
};

const CategorySelect = ({
  Area,
  setSelectValue,
  selectValue,
  setShow,
  show,
}: Props) => {
  const [option, setOptions] = useState<any>([]);

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
          option={Area}
          setSelectValue={setSelectValue}
          selectValue={selectValue}
        />
      )}
    </div>
  );
};

export default CategorySelect;