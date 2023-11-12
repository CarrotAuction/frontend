import { IForm } from '@/src/types/signup';
import React from 'react';
import { UseFormRegister, Path } from 'react-hook-form';
import styles from './index.module.scss';

type SelectProps = {
  label: Path<IForm>;
  register: UseFormRegister<IForm>;
  options: { value: string; label: string }[];
  title?: string;
  required: boolean;
};

const Select = ({ label, register, options, title, required }: SelectProps) => (
  <div className={styles.select}>
    <label className={styles.title}>{title}</label>
    <select {...register(label, { required })}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default Select;
