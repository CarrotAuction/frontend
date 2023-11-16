import React from 'react';
import {
  CategoryType,
  CityType,
  SelectOption,
  SelectValueType,
} from '@/src/types/search';
import styles from './index.module.scss';

type Props = {
  option: CategoryType[] | CityType[] | undefined;
  setSelectValue: React.Dispatch<React.SetStateAction<SelectValueType>>;
  title: string;
};

const Options = ({ option, setSelectValue, title }: Props) => {
  const clickChangeData = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLInputElement;
    if (title === '대표 지역선택') {
      if (target.innerText === '대표 지역선택') {
        target.innerText = '';
      }
      setSelectValue((pre) => {
        return { ...pre, area: target.innerText };
      });
    } else if (title === '시/구/군') {
      if (target.innerText === '시/구/군') {
        target.innerText = '';
      }
      setSelectValue((pre) => {
        return { ...pre, city: target.innerText };
      });
    } else {
      if (target.innerText === '카테고리') {
        target.innerText = '';
      }
      setSelectValue((pre) => {
        return { ...pre, category: target.innerText };
      });
    }
  };
  return (
    <div className={styles.options}>
      {option?.map((i: CategoryType | CityType) => {
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
