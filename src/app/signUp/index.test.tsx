import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SignUp from './page';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('회원가입 컴포넌트', () => {
  const queryClient = new QueryClient();
  beforeEach(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <SignUp />
      </QueryClientProvider>,
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
});
