import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Sentry from '@sentry/react';

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setIsLoggedIn(!!token);
  }, []);

  const logout = () => {
    // try {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
    navigate('/');

    // 고의로 에러 발생시킴
    // throw new Error('Sentry 테스트 에러: 로그아웃 후 에러 발생');
    // } catch (error) {
    //   Sentry.captureException(error);
    // }
  };

  return {
    isLoggedIn,
    logout,
  };
};

export default useAuth;
