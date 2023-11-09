import React from 'react';
import { BsSearch } from 'react-icons/bs';
import styles from './index.module.scss';

type Props = {
  searchData: string;
  onchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const DataSearch = ({ searchData, onchange }: Props) => {
  return (
    <div className={styles.search}>
      <input
        type="text"
        value={searchData}
        onChange={onchange}
        className={styles.input}
        placeholder="검색어를 입력해주세요!"
      />
      <BsSearch className={styles.searchIcon} />
    </div>
  );
};

export default DataSearch;
