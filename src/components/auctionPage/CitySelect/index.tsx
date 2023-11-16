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

const CitySelect = ({
  Area,
  setSelectValue,
  selectValue,
  setShow,
  show,
}: Props) => {
  const clickOption = () => {
    if (selectValue.area) {
      setShow((pre) => {
        return {
          areaShow: false,
          cityShow: !pre.cityShow,
          categoryShow: false,
        };
      });
    }
  };

  const data = Area.find((i) => i.value === selectValue.area);
  return (
    <div onClick={clickOption} className={styles.selectBox}>
      <div>{selectValue.city || '시/구/군'}</div>
      <div className={styles.line} />
      <div className={styles.caret} />
      {selectValue.area && show.cityShow && (
        <Options
          title="시/구/군"
          option={data?.city}
          setSelectValue={setSelectValue}
        />
      )}
    </div>
  );
};

export default CitySelect;
