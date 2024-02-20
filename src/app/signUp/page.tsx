'use client';

import React, { useState } from 'react';
import {
  IdValidate,
  NickNameValidate,
  PasswordValidate,
  correctId,
  correctNick,
  correctPassword,
  correctPasswordCheck,
} from '@/src/constants/signup';
import { useForm } from 'react-hook-form';
import { IForm, Location, SignShowTpye } from '@/src/types/signup';
import AreaSelectBox from '@/src/components/signUpPage/Select/AreaSelectBox';
import Input from '@/src/components/signUpPage/Input';
import { Area } from '@/src/constants/search';
import CitySelectBox from '@/src/components/signUpPage/Select/CitySelectBox';
import { useRouter } from 'next/navigation';
import { usePostSignUp } from '@/src/remote/query/signup';
import styles from './index.module.scss';

const SignUp = () => {
  const router = useRouter();

  const [click, setClick] = useState(false);
  const [location, setLocation] = useState<Location>({
    area: '',
    city: '',
  });
  const [show, setShow] = useState<SignShowTpye>({
    area: false,
    city: false,
  });

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<IForm>({
    mode: 'onSubmit',
    defaultValues: {
      id: '',
      nick_name: '',
      password: '',
      password_check: '',
    },
  });

  const { mutate } = usePostSignUp();

  const onSubmit = async (data: IForm) => {
    if (location.area === '' || location.city === '') {
      alert('거주지를 선택해주세요');
      return;
    }
    mutate(
      {
        nickname: data.nick_name,
        password: data.password,
        accountID: data.id,
        province: location.area,
        city: location.city,
      },
      {
        onSuccess: () => {
          router.push('/login');
        },
      },
    );
  };

  return (
    <main className={styles.background}>
      <div className={styles.signUpPage}>
        <h1 className={styles.title}>회원가입</h1>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <Input
            test="id-input"
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
            test="nick-input"
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
            test="pw-input"
            label="password"
            title="비밀번호"
            register={register}
            required
            validate={PasswordValidate}
            errors={errors}
            correct={correctPassword}
            click={click}
            password={watch('password')}
          />
          <Input
            test="pw-differ"
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
            password={watch('password_check')}
          />
          <div className={styles.select}>
            <AreaSelectBox
              Area={Area}
              setLocation={setLocation}
              selectValue={location}
              setShow={setShow}
              show={show}
              label="area"
            />
            <CitySelectBox
              Area={Area}
              setLocation={setLocation}
              selectValue={location}
              setShow={setShow}
              show={show}
              label="city"
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
      </div>
    </main>
  );
};

export default SignUp;
