import create from 'zustand';
import { AuthState } from '../types';

const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: !!localStorage.getItem('accessToken'),
  accessToken: localStorage.getItem('accessToken'),

  login: (token: string) => {
    localStorage.setItem('accessToken', token);
    set({ isLoggedIn: true, accessToken: token });
  },

  logout: () => {
    // Sentry 에러 모니터링
    // try {
    localStorage.removeItem('accessToken');
    set({ isLoggedIn: false, accessToken: null });
    // 고의로 에러 발생시킴
    // throw new Error('Sentry 테스트 에러: 로그아웃 후 에러 발생');
    // } catch (error) {
    //   Sentry.captureException(error);
    // }
  },
}));

export default useAuthStore;
