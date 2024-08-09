import axios from 'axios';

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
