import React from 'react';
import {
  CategoryType,
  CityType,
  SelectOption,
  SelectValueType,
} from '@/src/types/search';
import { selectOption } from '@/src/utils/Option';
import styles from './index.module.scss';

type Props = {
  option: CategoryType[] | CityType[] | undefined;
  setSelectValue: React.Dispatch<React.SetStateAction<SelectValueType>>;
  title: string;
};

const Options = ({ option, setSelectValue, title }: Props) => {
  const clickChangeData = (e: React.MouseEvent<HTMLDivElement>) => {
    // 데이터
    const target = e.target as HTMLInputElement;
    const option = selectOption(target.innerText, title);

    // 액션
    setSelectValue((pre) => {
      return { ...pre, [option.location]: option.text };
    });
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
