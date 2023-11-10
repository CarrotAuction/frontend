import React from 'react';
import styles from './index.module.scss';

const Login = () => {
  return (
    <main className={styles.loginPage}>
      <h1>로그인</h1>
      <form>
        <label htmlFor="id">아이디</label>
        <input type="text" id="id" />
        <label htmlFor="password">비밀번호</label>
        <input type="password" id="password" />
        <button type="button">Submit</button>
      </form>
      <p>회원가입하러 가기</p>
    </main>
  );
};

export default Login;
