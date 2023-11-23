import { useMutation } from '@tanstack/react-query';

import { getAccessTokenAPI } from '../apis/common/AccessToken';
import useAuthStore from '../store/authStore';

export default function useAccessTokenMutation() {
  const { setUser } = useAuthStore();
  return useMutation({
    mutationFn: async () => {
      const { data } = await getAccessTokenAPI();
      return data;
    },
    onSuccess: ({ accessToken, userId }) => {
      //TODO store에 저장
      console.log('성공', accessToken, userId);
      setUser({
        accessToken,
        userId,
      });
    },
    onError: (error) => {
      //TODO store에서 제거
      console.log(error);
      setUser(null);
    },
  });
}
