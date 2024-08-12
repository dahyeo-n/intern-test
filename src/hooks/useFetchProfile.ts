import useAuthStore from '../store/useAuthStore';
import { useQuery } from '@tanstack/react-query';
import { userSignAndProfileApi } from '../api/axios';

import queryKeys from '../queryKeys';
import { ProfileData } from '../types';

const useFetchProfile = () => {
  const accessToken = useAuthStore((state) => state.accessToken);

  const {
    data: profileData,
    isLoading,
    isError,
  } = useQuery<ProfileData>({
    queryKey: [queryKeys.profile, accessToken],
    queryFn: () =>
      userSignAndProfileApi.fetchProfile(accessToken!).then((res) => res.data),
    enabled: !!accessToken, // accessToken이 있을 때만 쿼리 실행
  });

  return { profileData, isLoading, isError };
};

export default useFetchProfile;
