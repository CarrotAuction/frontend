import {
  act,
  render,
  renderHook,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import nock from 'nock';
import { usePostLogin } from '@/src/hooks/query/login';
import { WithAllContexts } from '../../tests/utils';
import Login from './page';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('로그인 컴포넌트', () => {
  beforeEach(() => {
    render(
      <WithAllContexts>
        <Login />
      </WithAllContexts>,
    );
  });

  test('[RENDER] 렌더링 테스트', async () => {
    const id = screen.getByTestId('id-input');
    const password = screen.getByTestId('password-input');
    const button = screen.getByRole('button', { name: '로그인' });
    const link = screen.getByTestId('link');

    expect(id).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(link).toBeInTheDocument();
  });

  test('[ERROR] 아이디 또는 비밀번호를 입력안했을 시 alert창 띄우기', async () => {
    const id = screen.getByTestId('id-input');
    const password = screen.getByTestId('password-input');
    const button = screen.getByRole('button', { name: '로그인' });

    expect(id).toBeInTheDocument();
    expect(password).toBeInTheDocument();

    await userEvent.type(id, 'testUser');
    expect(id).toHaveValue('testUser');

    expect(password).toHaveValue('');

    await userEvent.click(button);
    const alert = screen.getByRole('dialog');
    expect(alert).toBeInTheDocument();
  });

  test('[ERROR] 아이디가 있다면 유저 아이콘이 나온다', async () => {
    const id = screen.getByTestId('id-input');

    await userEvent.type(id, 'seunghwan');

    const icon = screen.getByTestId('id-icon');
    expect(icon).toBeInTheDocument();
  });

  test('[ERROR] 비밀번호를 입력했을 시 아이콘이 나오고 타입이 바뀐다', async () => {
    const password = screen.getByTestId('password-input');
    await userEvent.type(password, 'testPassword');

    const visibleIcon = screen.getByTestId('password_invisible_icon');
    expect(visibleIcon).toBeInTheDocument();

    await userEvent.click(visibleIcon);

    const invisibleIcon = screen.getByTestId('password_visible_icon');
    expect(invisibleIcon).toBeInTheDocument();
    expect(password).toHaveAttribute('type', 'text');
  });

  test('[ERROR] 회원가입하러가기는 /signUp이라는 링크를 가지고있다.', async () => {
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/signUp');
  });

  test('[SUCCESS] 로그인 성공 ', async () => {
    const queryClient = new QueryClient();
    const wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const id = screen.getByTestId('id-input');
    const password = screen.getByTestId('password-input');
    const button = screen.getByRole('button', { name: '로그인' });

    expect(id).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    await userEvent.type(id, 'sun123123');
    await userEvent.type(password, '123123');
    await userEvent.click(button);

    const idValue: string = (id as HTMLInputElement).value;
    const passwordValue: string = (password as HTMLInputElement).value;

    nock('http://localhost:8080')
      .post('/users/login', {
        accountID: 'sun123123',
        password: '123123',
      })
      .reply(200, { hi: 'hi' });

    const { result } = renderHook(() => usePostLogin(), { wrapper });

    await act(() => {
      result.current.mutate({
        accountID: idValue,
        password: passwordValue,
      });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual({ hi: 'hi' });

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
  });
});
