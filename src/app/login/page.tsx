'use client';

import React, { useState } from 'react';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { GiCancel } from 'react-icons/gi';
import Link from 'next/link';
import useInput from '@/src/hooks/useInput';
import styles from './index.module.scss';

const Login = () => {
  const [id, changeId, resetId] = useInput();
  const [password, changePassword] = useInput();

  const [isVisible, setIsVisible] = useState(false);

  const togglePassword = () => {
    setIsVisible((pre) => !pre);
  };

  const sendLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (id === '' || password === '') {
      alert('아이디 또는 비밀번호를 입력해주세요 ');
    }
  };

  return (
    <main className={styles.loginPage}>
      <h1 className={styles.title}>로그인</h1>
      <form className={styles.form}>
        <label htmlFor="id">아이디</label>
        <div className={styles.inputBox}>
          <input onChange={changeId} value={id} type="text" id="id" />
          {id && <GiCancel onClick={resetId} className={styles.icon} />}
        </div>
        <label htmlFor="password">비밀번호</label>
        <div className={styles.inputBox}>
          <input
            onChange={changePassword}
            value={password}
            type={isVisible ? 'text' : 'password'}
            id="password"
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
        <button className={styles.submit} onClick={sendLogin} type="button">
          로그인
        </button>
      </form>
      <p className={styles.signUp}>
        <Link href="/signUp">회원가입하러가기</Link>
      </p>
    </main>
  );
};

export default Login;
