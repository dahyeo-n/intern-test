import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userSignAndProfileApi } from '../api/axios';

import queryKeys from '../queryKeys';
import { UpdateProfileData } from '../types';

export const useUpdateProfileMutation = (accessToken: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProfileData) =>
      userSignAndProfileApi
        .updateProfile(data, accessToken)
        .then((res) => res.data),

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.profile, accessToken],
      });

      alert(data.message || '프로필이 업데이트되었습니다.');
    },
  });
};
