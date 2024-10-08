import { userSignAndProfileApi } from '../api/axios';

jest.mock('../api/axios');

const handleUpdate = async (
  avatar: File | null,
  nickname: string,
  accessToken: string
) => {
  try {
    const response = await userSignAndProfileApi.updateProfile(
      { avatar, nickname },
      accessToken
    );
    alert(response.data.message);
  } catch (error) {
    alert('프로필 변경에 실패하였습니다.');
  }
};

test('프로필 변경 성공 시 alert 호출', async () => {
  (userSignAndProfileApi.updateProfile as jest.Mock).mockResolvedValueOnce({
    data: { message: '프로필이 성공적으로 업데이트되었습니다.' },
  });

  const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

  await handleUpdate(null, 'newNickname', 'fakeAccessToken');

  expect(userSignAndProfileApi.updateProfile).toHaveBeenCalledWith(
    { avatar: null, nickname: 'newNickname' },
    'fakeAccessToken'
  );
  expect(alertSpy).toHaveBeenCalledWith(
    '프로필이 성공적으로 업데이트되었습니다.'
  );
});

test('프로필 변경 실패 시 alert 호출', async () => {
  (userSignAndProfileApi.updateProfile as jest.Mock).mockRejectedValueOnce(
    new Error('업데이트 실패')
  );

  const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

  await handleUpdate(null, 'newNickname', 'fakeAccessToken');

  expect(alertSpy).toHaveBeenCalledWith('프로필 변경에 실패하였습니다.');
});
