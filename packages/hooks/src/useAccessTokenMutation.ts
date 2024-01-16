import { getAccessTokenAPI } from '@anifriends/apis';
import { useAuthStore } from '@anifriends/store';
import { useMutation } from '@tanstack/react-query';

export const useAccessTokenMutation = () => {
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
};
