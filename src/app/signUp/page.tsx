'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IForm } from '@/src/types/signup';
import {
  IdValidate,
  NickNameValidate,
  PasswordValidate,
  correctId,
  correctNick,
  correctPassword,
  correctPasswordCheck,
} from '@/src/constants/signup';
import Input from '@/src/components/signUpPage/Input';
import Select from '@/src/components/signUpPage/Select';
import styles from './index.module.scss';

const SignUp = () => {
  const [click, setClick] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IForm>({
    mode: 'onSubmit',
    defaultValues: {
      profile: undefined,
      id: '',
      nick_name: '',
      password: '',
      password_check: '',
      area: '',
      city: '',
    },
  });

  const onSubmit = (data: IForm) => {
    console.log(data);
  };

  return (
    <main className={styles.signUpPage}>
      <h1 className={styles.title}>회원가입</h1>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="id"
          title="아이디"
          register={register}
          required
          validate={IdValidate}
          errors={errors}
          correct={correctId}
          click={click}
        />
        <Input
          label="nick_name"
          title="닉네임"
          register={register}
          required
          validate={NickNameValidate}
          errors={errors}
          correct={correctNick}
          click={click}
        />
        <Input
          label="password"
          title="비밀번호"
          register={register}
          required
          validate={PasswordValidate}
          errors={errors}
          correct={correctPassword}
          click={click}
        />
        <Input
          label="password_check"
          title="비밀번호 확인"
          register={register}
          required
          validate={{
            required: '비밀번호 확인을 입력해주세요',
            validate: (value: string) =>
              value === watch('password') || '비밀번호가 일치하지 않습니다',
          }}
          errors={errors}
          correct={correctPasswordCheck}
          click={click}
        />
        <div className={styles.select}>
          <Select
            label="area"
            register={register}
            options={[{ value: '서울', label: '서울' }]}
            title="거주지"
            required
          />
          <Select
            label="city"
            register={register}
            options={[{ value: '서울', label: '서울' }]}
            required
          />
        </div>

        <button
          className={styles.submit}
          type="submit"
          onClick={() => setClick(true)}
        >
          회원가입
        </button>
      </form>
    </main>
  );
};

export default SignUp;
