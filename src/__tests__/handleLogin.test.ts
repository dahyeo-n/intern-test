import { userSignAndProfileApi } from '../api/axios';

jest.mock('../api/axios');

const handleLogin = async () => {
  try {
    const response = await userSignAndProfileApi.login({
      id: 'test@test.com',
      password: 'password',
    });
    localStorage.setItem('accessToken', response.data.accessToken);
  } catch (error) {
    alert('로그인에 실패하였습니다. 이메일과 비밀번호를 다시 확인해주세요.');
  }
};

test('로그인 성공 시 localStorage에 토큰을 저장한다.', async () => {
  (userSignAndProfileApi.login as jest.Mock).mockResolvedValueOnce({
    data: { accessToken: 'fakeToken' },
  });

  // localStorage.setItem 모킹
  const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

  await handleLogin();

  expect(setItemSpy).toHaveBeenCalledWith('accessToken', 'fakeToken');
});
