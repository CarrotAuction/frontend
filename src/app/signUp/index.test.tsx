import {
  act,
  render,
  renderHook,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import nock from 'nock';
import { WithAllContexts } from '@/src/tests/utils';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { usePostSignUp } from '@/src/remote/query/signup';
import Swal from 'sweetalert2';
import SignUp from './page';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

jest.mock('sweetAlert2', () => ({
  fire: jest.fn(),
}));

describe('회원가입 컴포넌트', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

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

  test('[ERROR] 입력없이 회원가입을 눌렀을 시 에러 메세지 띄우기', async () => {
    const button = screen.getByRole('button');
    await userEvent.click(button);

    const error = screen.getAllByTestId('error');
    expect(error.length).toBe(4);
  });

  test('[ERROR] 비밀번호 일치 확인', async () => {
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

  test('[ERROR] 비밀번호가 일치하지 않습니다', async () => {
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

  test('[ERROR] 대표지역 또는 시/구/군을 선택안했을 시 경고창 띄우기 ', async () => {
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

  test('[ERROR] 패스워드를 입력했다면 패스워드 표시 아이콘 나오기', async () => {
    const password = screen.getByTestId('pw-input');
    const passwordCheck = screen.getByTestId('pw-differ');

    await userEvent.type(password, '123123');
    await userEvent.type(passwordCheck, '123123');

    const icons = screen.getAllByTestId('ps-icon');
    expect(icons.length).toBe(2);
  });

  test('[SUCCESS] 회원가입 성공', async () => {
    const queryClient = new QueryClient();
    const wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const stub = nock('http://localhost:8080')
      .post('/users/register', {
        nickname: '승환입니다',
        password: '123123',
        accountID: 'sun12387',
        province: '서울특별시',
        city: '관악구',
      })
      .reply(200, { data: '가입 완료' });

    const { result } = renderHook(() => usePostSignUp(), {
      wrapper,
    });

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

    expect(Swal.fire).toHaveBeenCalledWith({
      icon: 'success',
      title: '회원가입에 성공하셨습니다 !',
      text: '로그인페이지로 이동합니다.',
    });
  });

  test('[ERROR] 회원가입 실패', async () => {
    const queryClient = new QueryClient();
    const wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const button = screen.getByRole('button', { name: '회원가입' });
    await userEvent.click(button);
    nock('http://localhost:8080')
      .post('/users/register', {
        nickname: '승환입니다',
        password: '1231232',
        accountID: 'sun12387',
        province: '서울특별시',
        city: '관악구',
      })
      .reply(500, {});

    const { result } = renderHook(() => usePostSignUp(), { wrapper });

    await waitFor(() => {
      result.current.mutate({
        nickname: '승환입니다',
        password: '1231232',
        accountID: 'sun12387',
        province: '서울특별시',
        city: '관악구',
      });
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(false));
  });
});
