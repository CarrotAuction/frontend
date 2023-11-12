import { IForm } from '@/src/types/signup';
import React from 'react';
import { Path, UseFormRegister, FieldErrors } from 'react-hook-form';
import styles from './index.module.scss';

type InputProps = {
  label: Path<IForm>;
  register: UseFormRegister<IForm>;
  required: boolean;
  errors: FieldErrors<IForm>;
  title: string;
  validate: Object;
  correct: string;
  click: boolean;
};

const Input = ({
  label,
  register,
  required,
  errors,
  title,
  validate,
  correct,
  click,
}: InputProps) => (
  <div className={styles.inputBox}>
    <label htmlFor={label}>{title}</label>
    <input type="text" id={label} {...register(label, validate)} />
    <div
      className={
        errors[label]?.message ? styles.error_check : styles.correct_check
      }
    >
      {errors[label]?.message ? (
        <p>{errors[label]?.message}</p>
      ) : (
        <p>{click && correct}</p>
      )}
    </div>
  </div>
);

export default Input;
