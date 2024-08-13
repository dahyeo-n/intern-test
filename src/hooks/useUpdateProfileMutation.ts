import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userSignAndProfileApi } from '../api/axios';

import queryKeys from '../queryKeys';
import { UpdateProfileData } from '../types';
import { useProflieStore } from '../store/useProfileStore';

export const useUpdateProfileMutation = (accessToken: string) => {
  const queryClient = useQueryClient();
  const setProfile = useProflieStore((state) => state.setProfile);

  return useMutation({
    mutationFn: (data: UpdateProfileData) =>
      userSignAndProfileApi
        .updateProfile(data, accessToken)
        .then((res) => res.data),

    onSuccess: (data) => {
      setProfile(data.nickname, data.avatar || null);

      queryClient.invalidateQueries({
        queryKey: [queryKeys.profile, accessToken],
      });

      alert(data.message || '프로필이 업데이트되었습니다.');
    },
  });
};
