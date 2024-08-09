import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const axiosTodosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

export default axiosTodosInstance;

const axiosInstance = axios.create({
  baseURL: 'https://moneyfulpublicpolicy.co.kr',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const api = {
  register: async (data: {
    id: string;
    password: string;
    nickname: string;
  }) => {
    return axiosInstance.post('/register', data);
  },

  login: async (data: { id: string; password: string }) => {
    return axiosInstance.post('/login', data);
  },

  // accessToken이 유효한 경우, 비밀번호를 제외한 본인의 회원 정보를 응답
  fetchProfile: async (accessToken: string) => {
    return axiosInstance.get('/user', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  },

  updateProfile: async (
    data: { avatar: File | null; nickname: string },
    accessToken: string
  ) => {
    const formData = new FormData();
    if (data.avatar) {
      formData.append('avatar', data.avatar);
    }
    formData.append('nickname', data.nickname);
    return axiosInstance.patch('/profile', formData, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  },
};

export const useUpdateProfileMutation = (accessToken: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { avatar: File | null; nickname: string }) =>
      api.updateProfile(data, accessToken).then((res) => res.data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['profile', accessToken] });
      alert(data.message || '프로필이 성공적으로 업데이트되었습니다.');
    },
  });
};
