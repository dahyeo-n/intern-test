import React, { useState } from 'react';
import { useHandleRegister } from '../hooks/useHandleRegister';

const SignUp: React.FC = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');

  return (
    <div className='px-10'>
      <div className='mb-3'>
        <label className='block font-medium'>닉네임</label>
        <input
          type='text'
          className='border p-2 w-full'
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
      </div>
      <div className='mb-3'>
        <label className='block font-medium'>이메일</label>
        <input
          type='text'
          className='border p-2 w-full'
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
      </div>
      <div className='mb-3'>
        <label className='block font-medium'>비밀번호</label>
        <input
          type='password'
          className='border p-2 w-full'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        onClick={() => useHandleRegister({ id, password, nickname })}
        className='bg-blue-500 text-white px-4 py-2 mt-2 rounded'
      >
        회원가입하기
      </button>
    </div>
  );
};

export default SignUp;
