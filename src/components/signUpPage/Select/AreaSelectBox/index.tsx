import { Location, SignShowTpye } from '@/src/types/signup';
import React from 'react';
import { SelectOption } from '@/src/types/search';
import SignOptions from '../Options';
import styles from './index.module.scss';

type Props = {
  Area: SelectOption[];
  setLocation: React.Dispatch<React.SetStateAction<Location>>;
  selectValue: Location;
  setShow: React.Dispatch<React.SetStateAction<SignShowTpye>>;
  show: SignShowTpye;
  label: string;
};

const AreaSelectBox = ({
  Area,
  setLocation,
  selectValue,
  show,
  setShow,
  label,
}: Props) => {
  const clickOption = () => {
    setShow((pre) => {
      return {
        area: !pre.area,
        city: false,
      };
    });
  };

  return (
    <div className={styles.select}>
      <div className={styles.title}>거주지</div>
      <div onClick={clickOption} className={styles.selectBox}>
        <div>{selectValue.area || '대표 지역선택'}</div>
        <div className={styles.line} />
        <div className={styles.caret} />
        {show.area && (
          <SignOptions
            title="대표 지역선택"
            Area={Area}
            setLocation={setLocation}
          />
        )}
      </div>
    </div>
  );
};

export default AreaSelectBox;
