import React from 'react';
import { SelectOption, SelectValueType } from '@/src/types/search';
import styles from './index.module.scss';

type Props = {
  option: any;
  setSelectValue: React.Dispatch<React.SetStateAction<SelectValueType>>;
  selectValue: SelectValueType;
  title: string;
};

const Options = ({ option, setSelectValue, selectValue, title }: Props) => {
  const clickChangeData = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLInputElement;
    if (title === '대표 지역선택') {
      setSelectValue((pre) => {
        return { ...pre, area: target.innerText };
      });
    } else if (title === '시/구/군') {
      setSelectValue((pre) => {
        return { ...pre, city: target.innerText };
      });
    } else {
      setSelectValue((pre) => {
        return { ...pre, category: target.innerText };
      });
    }
  };
  return (
    <div className={styles.options}>
      {option.map((i: any) => {
        return (
          <div onClick={clickChangeData} key={i.value}>
            {i.label}
          </div>
        );
      })}
    </div>
  );
};

export default Options;