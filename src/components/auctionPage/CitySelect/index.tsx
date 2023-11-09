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
  const [option, setOptions] = useState<any>([]);

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

  return (
    <div onClick={clickOption} className={styles.selectBox}>
      <div>{selectValue.city || '시/구/군'}</div>
      <div className={styles.line} />
      <div className={styles.caret} />
      {show.cityShow && (
        <Options
          title="시/구/군"
          option={Area}
          setSelectValue={setSelectValue}
          selectValue={selectValue}
        />
      )}
    </div>
  );
};

export default CitySelect;
