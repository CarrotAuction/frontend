import {
  act,
  getByRole,
  render,
  renderHook,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import nock from 'nock';
import { useSignup } from '@/src/tests/signup';
import { WithAllContexts } from '@/src/tests/utils';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import SignUp from './page';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('회원가입 컴포넌트', () => {
  beforeEach(() => {
    render(
      <WithAllContexts>
        <SignUp />
      </WithAllContexts>,
    );
  });

  test('[Render] 렌더링 테스트', () => {
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('회원가입');

    expect(screen.getByText('아이디'));
    expect(screen.getByText('닉네임'));
    expect(screen.getByText('비밀번호'));
    expect(screen.getByText('비밀번호 확인'));
    expect(screen.getByText('대표 지역선택'));
    expect(screen.getByText('시/구/군'));
  });

  test('[Error] 입력없이 회원가입을 눌렀을 시 에러 메세지 띄우기', async () => {
    const button = screen.getByRole('button');
    await userEvent.click(button);

    const error = screen.getAllByTestId('error');
    expect(error.length).toBe(4);
  });

  test('[Error] 비밀번호 일치 확인', async () => {
    const input: HTMLInputElement = screen.getByTestId('pw-input');
    const secondInput: HTMLInputElement = screen.getByTestId('pw-differ');

    input.focus();
    await userEvent.type(input, '1234');
    input.blur();

    secondInput.focus();
    await userEvent.type(secondInput, '1234');
    secondInput.blur();

    expect(input.value).toBe(secondInput.value);
  });

  test('[Error] 비밀번호가 일치하지 않습니다', async () => {
    const input: HTMLInputElement = screen.getByTestId('pw-input');
    const secondInput: HTMLInputElement = screen.getByTestId('pw-differ');

    input.focus();
    await userEvent.type(input, '1234');
    input.blur();

    secondInput.focus();
    await userEvent.type(secondInput, '123');
    secondInput.blur();

    expect(input.value).not.toBe(secondInput.value);
  });

  test('[Error] 대표지역 또는 시/구/군을 선택안했을 시 경고창 띄우기 ', async () => {
    window.alert = jest.fn();

    const button = screen.getByRole('button');
    await userEvent.click(button);

    const id = screen.getByTestId('id-input');
    const nickname = screen.getByTestId('nick-input');
    const password = screen.getByTestId('pw-input');
    const passwordCheck = screen.getByTestId('pw-differ');

    await userEvent.type(id, 'sun12387');
    await userEvent.type(nickname, '승환');
    await userEvent.type(password, '123123');
    await userEvent.type(passwordCheck, '123123');

    await userEvent.click(button);

    expect(window.alert).toHaveBeenCalledTimes(1);
  });

  test('[Error] 패스워드가 있다면 아이콘 나오기', async () => {
    const password = screen.getByTestId('pw-input');
    const passwordCheck = screen.getByTestId('pw-differ');

    await userEvent.type(password, '123123');
    await userEvent.type(passwordCheck, '123123');

    const icons = screen.getAllByTestId('ps-icon');
    expect(icons.length).toBe(2);
  });

  test('[Success] 회원가입 성공', async () => {
    const queryClient = new QueryClient();
    const wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const button = screen.getByRole('button', { name: '회원가입' });

    await userEvent.click(button);
    nock('http://localhost:8080')
      .post('/users/register', {
        nickname: '승환입니다',
        password: '123123',
        accountID: 'sun12387',
        province: '서울특별시',
        city: '관악구',
      })
      .reply(200, { data: '가입 완료' });

    const { result } = renderHook(() => useSignup(), { wrapper });

    await act(() => {
      result.current.mutate({
        nickname: '승환입니다',
        password: '123123',
        accountID: 'sun12387',
        province: '서울특별시',
        city: '관악구',
      });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual({ data: '가입 완료' });
  });
});
