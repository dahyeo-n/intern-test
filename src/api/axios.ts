import axios from 'axios';
import { LoginData, RegisterData, UpdateProfileData } from '../types';

const axiosTodosInstance = axios.create({
  baseURL: import.meta.env.VITE_TODOS_BASE_URL,
});

export default axiosTodosInstance;

const axiosUserInstance = axios.create({
  baseURL: import.meta.env.VITE_USER_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const userSignAndProfileApi = {
  register: async (data: RegisterData) => {
    return axiosUserInstance.post('/register', data);
  },

  login: async (data: LoginData) => {
    return axiosUserInstance.post('/login', data);
  },

  fetchProfile: async (accessToken: string) => {
    return axiosUserInstance.get('/user', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  },

  updateProfile: async (data: UpdateProfileData, accessToken: string) => {
    const formData = new FormData();

    if (data.avatar) {
      formData.append('avatar', data.avatar);
    }

    formData.append('nickname', data.nickname);

    return axiosUserInstance.patch('/profile', formData, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  },
};
