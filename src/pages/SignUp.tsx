import React, { useState } from 'react';
import { api } from '../api/axios';

const SignUp: React.FC = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');

  const handleRegister = async () => {
    try {
      const response = await api.register({ id, password, nickname });
      alert(response.data.message);
    } catch (error) {
      alert('회원가입에 실패하였습니다.');
    }
  };

  return (
    <div className='p-4'>
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
        onClick={handleRegister}
        className='bg-blue-500 text-white px-4 py-2 mt-2 rounded'
      >
        회원가입하기
      </button>
    </div>
  );
};

export default SignUp;
