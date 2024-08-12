import axios from 'axios';

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
  register: async (data: {
    id: string;
    password: string;
    nickname: string;
  }) => {
    return axiosUserInstance.post('/register', data);
  },

  login: async (data: { id: string; password: string }) => {
    return axiosUserInstance.post('/login', data);
  },

  fetchProfile: async (accessToken: string) => {
    return axiosUserInstance.get('/user', {
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

    return axiosUserInstance.patch('/profile', formData, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  },
};
