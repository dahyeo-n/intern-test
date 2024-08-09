import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api, useUpdateProfileMutation } from '../api/axios';
import useAuthStore from '../zustand/useAuthStore';

interface ProfileData {
  nickname: string;
  avatar?: string;
}

const My: React.FC = () => {
  const accessToken = useAuthStore((state) => state.accessToken);

  const { data, isLoading, isError } = useQuery<ProfileData>({
    queryKey: ['profile', accessToken],
    queryFn: () => api.fetchProfile(accessToken!).then((res) => res.data),
    enabled: !!accessToken, // accessToken이 있을 때만 쿼리 실행
  });

  const [nickname, setNickname] = useState('');
  const [avatar, setAvatar] = useState<File | null>(null);

  useEffect(() => {
    if (data) {
      setNickname(data.nickname);
      setAvatar(null); // 기존 아바타는 서버의 URL을 사용하므로 초기화
    }
  }, [data]);

  const { mutate, isError: isMutationError } = useUpdateProfileMutation(
    accessToken!
  );

  const handleUpdate = () => {
    mutate({ avatar, nickname });
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>프로필 로딩 에러</div>;

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
        <label className='block font-medium'>프로필 사진</label>
        {data?.avatar && (
          <img
            src={data.avatar}
            className='mt-4 w-24 h-24 object-cover'
            alt='avatar'
          />
        )}
        <input
          type='file'
          className='border p-2 w-full'
          onChange={(e) => {
            const file = e.target.files ? e.target.files[0] : null;
            setAvatar(file);
          }}
        />
      </div>
      <button
        onClick={handleUpdate}
        className='bg-blue-500 text-white px-4 py-2 mt-2 rounded'
      >
        프로필 변경하기
      </button>
      {isMutationError && <div>프로필 업데이트 에러</div>}
    </div>
  );
};

export default My;
