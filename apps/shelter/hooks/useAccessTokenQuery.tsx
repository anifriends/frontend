import { useMutation } from '@tanstack/react-query';
import { getAccessTokenAPI } from 'shared/apis/common/AccessToken';

export default function useAccessTokenMutation() {
  return useMutation({
    mutationFn: getAccessTokenAPI,
    onSuccess: () => {
      //TODO store에 저장
    },
    onError: () => {
      //TODO store에서 제거
    },
  });
}
