import { IForm } from '@/src/types/signup';
import React, { useState } from 'react';
import { Path, UseFormRegister, FieldErrors } from 'react-hook-form';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
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
  password?: string;
  test?: string;
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
  password,
  test,
}: InputProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const togglePassword = () => {
    setIsVisible((pre) => !pre);
  };

  return (
    <div className={styles.inputBox}>
      <label htmlFor={label}>{title}</label>
      <div>
        <input
          data-testid={test}
          type={isVisible ? 'text' : password ? 'password' : 'text'}
          id={label}
          {...register(label, validate)}
        />
        {password &&
          (isVisible === true ? (
            <AiFillEye onClick={togglePassword} className={styles.icon} />
          ) : (
            <AiFillEyeInvisible
              onClick={togglePassword}
              className={styles.icon}
            />
          ))}
      </div>
      <div
        className={
          errors[label]?.message ? styles.error_check : styles.correct_check
        }
      >
        {errors[label]?.message ? (
          <p data-testid="error">{errors[label]?.message}</p>
        ) : (
          <p>{click && correct}</p>
        )}
      </div>
    </div>
  );
};

export default Input;
