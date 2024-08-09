import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SignIn from '../pages/SignIn';
import { api } from '../api/axios';

jest.mock('../api/axios');
const mockedNavigate = jest.fn();

// useNavigate를 모킹
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('SignIn Component', () => {
  beforeEach(() => {
    // localStorage.setItem을 모킹
    jest.spyOn(window.localStorage, 'setItem');
  });

  afterEach(() => {
    // 각 테스트 후에 모킹한 것들을 초기화
    jest.clearAllMocks();
  });

  it('renders input fields and login button', () => {
    render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>
    );

    // 이메일, 비밀번호 입력 필드 및 로그인 버튼이 화면에 렌더링 되었는지 확인
    expect(screen.getByLabelText('이메일')).toBeInTheDocument();
    expect(screen.getByLabelText('비밀번호')).toBeInTheDocument();
    expect(screen.getByText('로그인하기')).toBeInTheDocument();
  });

  it('updates state on input change', () => {
    render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText('이메일') as HTMLInputElement;
    const passwordInput = screen.getByLabelText('비밀번호') as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    // 입력 필드가 업데이트 되었는지 확인
    expect(emailInput.value).toBe('test@test.com');
    expect(passwordInput.value).toBe('password');
  });

  it('calls login API and navigates on success', async () => {
    const fakeResponse = {
      data: {
        accessToken: 'fake-token',
      },
    };

    (api.login as jest.Mock).mockResolvedValueOnce(fakeResponse);

    render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText('이메일') as HTMLInputElement;
    const passwordInput = screen.getByLabelText('비밀번호') as HTMLInputElement;
    const loginButton = screen.getByText('로그인하기');

    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    fireEvent.click(loginButton);

    // api.login이 호출되었는지 확인
    expect(api.login).toHaveBeenCalledWith({
      id: 'test@test.com',
      password: 'password',
    });

    // localStorage에 accessToken이 저장되었는지 확인
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'accessToken',
      'fake-token'
    );

    // '/my' 경로로 이동했는지 확인
    expect(mockedNavigate).toHaveBeenCalledWith('/my');
  });

  it('shows an alert on login failure', async () => {
    (api.login as jest.Mock).mockRejectedValueOnce(new Error('Login failed'));

    // window.alert를 모킹
    jest.spyOn(window, 'alert').mockImplementation(() => {});

    render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>
    );

    const loginButton = screen.getByText('로그인하기');

    fireEvent.click(loginButton);

    // alert가 호출되었는지 확인
    expect(window.alert).toHaveBeenCalledWith(
      '로그인에 실패하였습니다. 이메일과 비밀번호를 다시 확인해주세요.'
    );
  });
});
