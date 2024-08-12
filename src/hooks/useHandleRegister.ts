import { userSignAndProfileApi } from '../api/axios';
import { RegisterData } from '../types';

export const useHandleRegister = async ({
  id,
  password,
  nickname,
}: RegisterData) => {
  try {
    const response = await userSignAndProfileApi.register({
      id,
      password,
      nickname,
    });
    alert(response.data.message);
  } catch (error) {
    alert('회원가입에 실패하였습니다.');
  }
};
