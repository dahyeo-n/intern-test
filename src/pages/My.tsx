import React, { useEffect, useState } from 'react';
import { api } from '../api/axios';

const My: React.FC = () => {
  const [nickname, setNickname] = useState('');
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarURL, setAvatarURL] = useState('');

  const accessToken = localStorage.getItem('accessToken') || '';

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.fetchProfile(accessToken);
        setNickname(response.data.nickname);
        if (response.data.avatar) {
          setAvatar(response.data.avater);
          setAvatarURL(response.data.avatar);
        }
        console.log(response.data);
      } catch (error) {
        console.log('프로필 가져오는 과정에서 에러 발생');
      }
    };
    fetchProfile();
  }, [accessToken]);

  const handleUpdate = async () => {
    try {
      const response = await api.updateProfile(
        { avatar, nickname },
        accessToken
      );
      alert(response.data.message);
    } catch (error) {
      alert('프로필 변경에 실패하였습니다.');
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
        <label className='block font-medium'>프로필 사진</label>
        {avatarURL && (
          <img src={avatarURL} className='mt-4 w-24 h-24 object-cover' />
        )}
        <input
          type='file'
          className='border p-2 w-full'
          onChange={(e) => {
            const file = e.target.files ? e.target.files[0] : null;
            if (file) {
              setAvatar(file);
              setAvatarURL(URL.createObjectURL(file));
            }
            console.log(e.target.files);
          }}
        />
      </div>
      <button
        onClick={handleUpdate}
        className='bg-blue-500 text-white px-4 py-2 rounded'
      >
        프로필 변경하기
      </button>
    </div>
  );
};

export default My;
