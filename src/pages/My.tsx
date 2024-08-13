import React, { useState, useEffect } from 'react';
import useAuthStore from '../store/useAuthStore';
import { useUpdateProfileMutation } from '../hooks/useUpdateProfileMutation';
import useFetchProfile from '../hooks/useFetchProfile';
import { useProflieStore } from '../store/useProfileStore';

const My: React.FC = () => {
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const accessToken = useAuthStore((state) => state.accessToken);
  const { profileData, isLoading, isError } = useFetchProfile();
  const { mutate: profileMutate, isError: isProfileMutationError } =
    useUpdateProfileMutation(accessToken!);

  const { nickname, avatar, setProfile } = useProflieStore((state) => ({
    nickname: state.nickname,
    avatar: state.avatar,
    setProfile: state.setProfile,
  }));

  const handleUpdate = () => {
    profileMutate({ avatar: avatarFile, nickname });
  };

  useEffect(() => {
    if (profileData) {
      setProfile(profileData.nickname, profileData.avatar || null);
      setAvatarFile(null); // 기존 아바타는 서버의 URL을 사용하므로 초기화
    }
  }, [profileData, setProfile]);

  useEffect(() => {
    if (avatar) {
      localStorage.setItem('avatar', avatar);
    }
  }, [avatar]);

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
          onChange={(e) => setProfile(e.target.value, avatar)}
        />
      </div>
      <div className='mb-3'>
        <label className='block font-medium'>프로필 사진</label>
        {profileData?.avatar && (
          <img
            src={profileData.avatar}
            className='mt-4 w-24 h-24 object-cover'
            alt='avatar'
          />
        )}
        <input
          type='file'
          className='border p-2 w-full'
          onChange={(e) => {
            const file = e.target.files ? e.target.files[0] : null;
            setAvatarFile(file);
            if (file) {
              const avatarURL = URL.createObjectURL(file);
              setProfile(nickname, avatarURL); // Zustand 상태 업데이트
              localStorage.setItem('avatar', avatarURL);
            }
          }}
        />
      </div>
      <button
        onClick={handleUpdate}
        className='bg-blue-500 text-white px-4 py-2 mt-2 rounded'
      >
        프로필 변경하기
      </button>
      {isProfileMutationError && <div>프로필 업데이트 에러</div>}
    </div>
  );
};

export default My;
