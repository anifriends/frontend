import { useQuery } from '@tanstack/react-query';
import { getRecruitmentDetail } from 'shared/apis/common/Recruitments';
import {
  createFormattedTime,
  createWeekDayLocalString,
} from 'shared/utils/date';

import { getSimpleShelterProfile } from '@/apis/shelter';

const useFetchVolunteerDetail = (recruitmentId: number) =>
  useQuery({
    queryKey: ['volunteer', recruitmentId],
    queryFn: async () => {
      const { shelterId, ...recruitmentInfo } = (
        await getRecruitmentDetail(recruitmentId)
      ).data;
      const shelterSimpleInfo = (await getSimpleShelterProfile(shelterId)).data;

      return {
        ...recruitmentInfo,
        shelterInfo: { shelterId, ...shelterSimpleInfo },
      };
    },
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
        shelterInfo: data.shelterInfo,
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
      shelterInfo: {
        shelterId: 0,
        shelterName: '',
        shelterImageUrl: '',
        shelterAddress: '',
        shelterEmail: '',
      },
    },
  });
export default useFetchVolunteerDetail;
