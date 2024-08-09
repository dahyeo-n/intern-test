import { Link, useNavigate } from 'react-router-dom';
import * as Sentry from '@sentry/react';

const NavBar: React.FC = () => {
  const isLoggedIn = !!localStorage.getItem('accessToken');
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      localStorage.removeItem('accessToken');
      navigate('/');

      // 고의로 에러 발생시킴
      throw new Error('Sentry 테스트 에러: 로그아웃 후 에러 발생');
    } catch (error) {
      // Sentry에 에러 보고
      Sentry.captureException(error);
    }
  };

  return (
    <nav className='bg-gray-200 p-3 mb-6 flex justify-between'>
      <Link
        to='/'
        className='text-blue-500 font-semibold px-4 py-2 hover:bg-slate-50 rounded'
      >
        Home
      </Link>
      <div className='flex space-x-4'>
        {isLoggedIn ? (
          <>
            <Link
              to='/my'
              className='text-blue-400 font-semibold px-4 py-2 hover:bg-slate-50 rounded'
            >
              마이페이지
            </Link>
            <button
              onClick={handleLogout}
              className='text-blue-400 font-semibold px-4 py-2 hover:bg-slate-50 rounded'
            >
              로그아웃
            </button>
          </>
        ) : (
          <>
            <Link
              to='/signin'
              className='text-blue-400 font-semibold px-4 py-2 hover:bg-slate-50 rounded'
            >
              로그인
            </Link>
            <Link
              to='/signup'
              className='text-blue-400 font-semibold px-4 py-2 hover:bg-slate-50 rounded'
            >
              회원가입
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
