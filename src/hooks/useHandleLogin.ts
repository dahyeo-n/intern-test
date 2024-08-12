import useAuthStore from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { userSignAndProfileApi } from '../api/axios';

interface Login {
  id: string;
  password: string;
}

export const useHandleLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleLogin = async ({ id, password }: Login) => {
    try {
      const response = await userSignAndProfileApi.login({ id, password });
      login(response.data.accessToken);
      navigate('/my');
    } catch (error) {
      alert('로그인에 실패하였습니다. 이메일과 비밀번호를 다시 확인해주세요.');
    }
  };

  return handleLogin;
};
