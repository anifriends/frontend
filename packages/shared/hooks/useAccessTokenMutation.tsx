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
      setUser({
        accessToken,
        userId,
      });
    },
    onError: (error) => {
      console.warn(error);
      setUser(null);
    },
  });
}
