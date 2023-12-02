import { Location, SignShowTpye } from '@/src/types/signup';
import React from 'react';
import { SelectOption } from '@/src/types/search';
import { AnimatePresence, motion } from 'framer-motion';
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
  const clickOption = (e: React.MouseEvent<HTMLDivElement>) => {
    setShow((pre) => {
      return {
        area: !pre.area,
        city: false,
      };
    });
  };

  return (
    <div data-testid="select" className={styles.select}>
      <div data-testid="live" className={styles.title}>
        거주지
      </div>
      <div
        data-testid="selectBox"
        onClick={clickOption}
        className={styles.selectBox}
      >
        <div>{selectValue.area || '대표 지역선택'}</div>
        <div className={styles.line} />
        <div className={styles.caret} />
        <AnimatePresence>
          {show.area && (
            <motion.div
              initial={{ top: 45, opacity: 0 }}
              animate={{ top: 52, opacity: 1 }}
              exit={{ top: 45, opacity: 0 }}
              transition={{
                duration: 0.2,
              }}
            >
              <SignOptions
                title="대표 지역선택"
                Area={Area}
                setLocation={setLocation}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AreaSelectBox;
