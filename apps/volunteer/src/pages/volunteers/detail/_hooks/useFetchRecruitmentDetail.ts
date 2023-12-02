import { useSuspenseQueries } from '@tanstack/react-query';
import { getRecruitmentDetail } from 'shared/apis/common/Recruitments';
import { User } from 'shared/store/authStore';

import { getIsAppliedRecruitment } from '@/apis/recruitment';

const useFetchRecruitmentDetail = (
  recruitmentId: number,
  user: User | null,
) => {
  return useSuspenseQueries({
    queries: [
      {
        queryKey: ['recruitment', recruitmentId],
        queryFn: async () => (await getRecruitmentDetail(recruitmentId)).data,
      },
      {
        queryKey: ['recruitment', recruitmentId, 'isApplied'],
        queryFn: async () => {
          if (!user) {
            return { isAppliedRecruitment: false };
          }
          return (await getIsAppliedRecruitment(recruitmentId)).data;
        },
      },
    ],
  });
};
export default useFetchRecruitmentDetail;
