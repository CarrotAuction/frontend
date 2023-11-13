import { Location, SignShowTpye } from '@/src/types/signup';
import React from 'react';
import { SelectOption } from '@/src/types/search';
import { AnimatePresence, motion } from 'framer-motion';
import Options from '../Options';
import styles from './index.module.scss';

type Props = {
  Area: SelectOption[];
  setLocation: React.Dispatch<React.SetStateAction<Location>>;
  selectValue: Location;
  setShow: React.Dispatch<React.SetStateAction<SignShowTpye>>;
  show: SignShowTpye;
  label: string;
};

const CitySelectBox = ({
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
        area: false,
        city: !pre.city,
      };
    });
  };

  const data = Area.find((i) => i.value === selectValue.area);
  return (
    <div className={styles.select}>
      <div className={styles.empty} />
      <div onClick={clickOption} className={styles.selectBox}>
        <div>{selectValue.city || '시/구/군'}</div>
        <div className={styles.line} />
        <div className={styles.caret} />

        <AnimatePresence>
          {selectValue.area && show.city && (
            <motion.div>
              <Options
                title="시/구/군"
                setLocation={setLocation}
                Area={data?.city}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CitySelectBox;
