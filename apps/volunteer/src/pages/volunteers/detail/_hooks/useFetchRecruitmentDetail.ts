import { useSuspenseQueries } from '@tanstack/react-query';
import { getRecruitmentDetail } from 'shared/apis/common/Recruitments';

import { getIsAppliedRecruitment } from '@/apis/recruitment';

const useFetchRecruitmentDetail = (recruitmentId: number) =>
  useSuspenseQueries({
    queries: [
      {
        queryKey: ['recruitment', recruitmentId],
        queryFn: async () => (await getRecruitmentDetail(recruitmentId)).data,
      },
      {
        queryKey: ['recruitment', recruitmentId, 'isApplied'],
        queryFn: async () =>
          (await getIsAppliedRecruitment(recruitmentId)).data,
      },
    ],
  });
export default useFetchRecruitmentDetail;
