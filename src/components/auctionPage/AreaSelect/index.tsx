'use client';

import { SelectOption, SelectValueType, ShowType } from '@/src/types/search';
import React, { useState } from 'react';
import styles from './index.module.scss';
import Options from '../Options';

type Props = {
  Area: SelectOption[];
  setSelectValue: React.Dispatch<React.SetStateAction<SelectValueType>>;
  selectValue: SelectValueType;
  setShow: React.Dispatch<React.SetStateAction<ShowType>>;
  show: ShowType;
};

const AreaSelect = ({
  Area,
  setSelectValue,
  selectValue,
  setShow,
  show,
}: Props) => {
  const [option, setOptions] = useState<any>([]);

  const clickOption = (e: React.MouseEvent<HTMLDivElement>) => {
    setShow((pre) => {
      return {
        areaShow: !pre.areaShow,
        cityShow: false,
        categoryShow: false,
      };
    });
  };

  return (
    <div onClick={clickOption} className={styles.selectBox}>
      <div>{selectValue.area || '대표 지역선택'}</div>
      <div className={styles.line} />
      <div className={styles.caret} />
      {show.areaShow && (
        <Options
          title="대표 지역선택"
          option={Area}
          setSelectValue={setSelectValue}
          selectValue={selectValue}
        />
      )}
    </div>
  );
};

export default AreaSelect;
