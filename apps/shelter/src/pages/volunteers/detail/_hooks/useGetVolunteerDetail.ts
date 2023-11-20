import { useQuery } from '@tanstack/react-query';
import { getRecruitmentDetail } from 'shared/apis/common/Recruitments';
import {
  createFormattedTime,
  createWeekDayLocalString,
} from 'shared/utils/date';

const useGetVolunteerDetail = (recruitmentId: number) => {
  return useQuery({
    queryKey: ['recruitment', recruitmentId],
    queryFn: async () => (await getRecruitmentDetail(recruitmentId)).data,
    select: (data) => {
      const startDate = new Date(data.recruitmentStartTime);
      const endDate = new Date(data.recruitmentEndTime);
      const deadLine = new Date(data.recruitmentDeadline);

      return {
        imageUrls: data.recruitmentImageUrls,
        title: data.recruitmentTitle,
        content: data.recruitmentContent,
        applicant: data.recruitmentApplicantCount,
        capacity: data.recruitmentCapacity,
        volunteerDay: `${createFormattedTime(
          startDate,
        )}(${createWeekDayLocalString(startDate)})`,
        recruitmentDeadline: `${createFormattedTime(
          deadLine,
        )}(${createWeekDayLocalString(deadLine)}) ${createFormattedTime(
          deadLine,
          'hh:mm',
        )}`,
        volunteerStartTime: createFormattedTime(startDate, 'hh:mm'),
        volunteerEndTime: createFormattedTime(endDate, 'hh:mm'),
        recruitmentCreatedAt: createFormattedTime(
          new Date(data.recruitmentCreatedAt),
        ),
        recruitmentIsClosed: data.recruitmentIsClosed,
      };
    },
    initialData: {
      recruitmentTitle: '',
      recruitmentApplicantCount: 0,
      recruitmentCapacity: 0,
      recruitmentContent: '',
      recruitmentStartTime: '',
      recruitmentEndTime: '',
      recruitmentIsClosed: false,
      recruitmentDeadline: '',
      recruitmentCreatedAt: '',
      recruitmentUpdatedAt: '',
      recruitmentImageUrls: [],
    },
  });
};

export default useGetVolunteerDetail;
