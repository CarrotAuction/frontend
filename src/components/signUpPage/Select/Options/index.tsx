import React from 'react';
import { CityType, SelectOption } from '@/src/types/search';
import { Location } from '@/src/types/signup';
import styles from './index.module.scss';

type Props = {
  Area: SelectOption[] | CityType[] | undefined;
  setLocation: React.Dispatch<React.SetStateAction<Location>>;
  title: string;
};

const SignOptions = ({ Area, setLocation, title }: Props) => {
  const clickChangeData = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLInputElement;
    if (title === '대표 지역선택') {
      if (target.innerText === '대표 지역선택') {
        target.innerText = '';
      }
      setLocation((pre) => {
        return { ...pre, area: target.innerText };
      });
    } else if (title === '시/구/군') {
      setLocation((pre) => {
        return { ...pre, city: target.innerText };
      });
    }
  };
  return (
    <div className={styles.optionBox}>
      {Area?.map((i) => {
        return (
          <div onClick={clickChangeData} key={i.value}>
            {i.value}
          </div>
        );
      })}
    </div>
  );
};

export default SignOptions;
