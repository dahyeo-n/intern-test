import React, { useState } from 'react';
import { api } from '../api/axios';
import { useNavigate } from 'react-router-dom';

const SignIn: React.FC = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await api.login({ id, password });
      localStorage.setItem('accessToken', response.data.accessToken);
      navigate('/my');
    } catch (error) {
      alert('로그인에 실패하였습니다. 이메일과 비밀번호를 다시 확인해주세요.');
    }
  };

  return (
    <div className='p-4'>
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
        onClick={handleLogin}
        className='bg-blue-500 text-white px-4 py-2 mt-2 rounded'
      >
        로그인하기
      </button>
    </div>
  );
};

export default SignIn;
