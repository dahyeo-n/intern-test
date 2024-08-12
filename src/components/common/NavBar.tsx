import React from 'react';
import ButtonLink from '../ButtonLink';
import useAuthStore from '../../store/useAuthStore';

const NavBar: React.FC = () => {
  const { isLoggedIn, logout } = useAuthStore();
  const buttonClassNames =
    'text-blue-400 font-semibold px-4 py-2 hover:bg-slate-50 rounded';

  return (
    <nav className='bg-gray-200 p-3 mb-6 flex justify-between'>
      <ButtonLink to='/' className='text-blue-500'>
        Home
      </ButtonLink>
      <div className='flex space-x-4'>
        {isLoggedIn ? (
          <>
            <ButtonLink to='/my'>마이페이지</ButtonLink>
            <button onClick={logout} className={buttonClassNames}>
              로그아웃
            </button>
          </>
        ) : (
          <>
            <ButtonLink to='/signin'>로그인</ButtonLink>
            <ButtonLink to='/signup'>회원가입</ButtonLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
