import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as nextRouter from 'next/router';

import Login from './page';

describe('로그인 컴포넌트', () => {
  beforeEach(() => {
    render(<Login />);
  });

  test('아이디 또는 비밀번호를 입력안했을 시 alert창 띄우기', async () => {
    window.alert = jest.fn();

    const id = screen.getByTestId('id-input');
    const password = screen.getByTestId('password-input');
    const button = screen.getByRole('button');

    expect(id).toBeInTheDocument();
    expect(password).toBeInTheDocument();

    await userEvent.type(id, 'testUser');
    expect(id).toHaveValue('testUser');

    expect(password).toHaveValue('');

    await userEvent.click(button);
    expect(window.alert).toHaveBeenCalledTimes(1);
  });

  test('아이디가 있다면 유저 아이콘이 나온다', async () => {
    const id = screen.getByTestId('id-input');

    await userEvent.type(id, 'seunghwan');

    const icon = screen.getByTestId('id-icon');
    expect(icon).toBeInTheDocument();
  });

  test('비밀번호를 입력했을 시 아이콘이 나오고 타입이 바뀐다', async () => {
    const password = screen.getByTestId('password-input');
    await userEvent.type(password, 'testPassword');

    const visibleIcon = screen.getByTestId('password_invisible_icon');
    expect(visibleIcon).toBeInTheDocument();

    await userEvent.click(visibleIcon);

    const invisibleIcon = screen.getByTestId('password_visible_icon');
    expect(invisibleIcon).toBeInTheDocument();
    expect(password).toHaveAttribute('type', 'text');
  });

  test('회원가입하러가기는 /signUp이라는 링크를 가지고있다.', async () => {
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/signUp');
  });
});
