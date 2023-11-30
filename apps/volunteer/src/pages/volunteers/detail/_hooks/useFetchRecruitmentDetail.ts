import { useSuspenseQuery } from '@tanstack/react-query';
import { getRecruitmentDetail } from 'shared/apis/common/Recruitments';

const useFetchRecruitmentDetail = (recruitmentId: number) =>
  useSuspenseQuery({
    queryKey: ['recruitment', recruitmentId],
    queryFn: async () => (await getRecruitmentDetail(recruitmentId)).data,
  });
export default useFetchRecruitmentDetail;
