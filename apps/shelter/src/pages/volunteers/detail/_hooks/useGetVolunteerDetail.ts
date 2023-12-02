import { useSuspenseQuery } from '@tanstack/react-query';
import {
  getRecruitmentDetail,
  RecruitmentDetailResponse,
} from 'shared/apis/common/Recruitments';

export type RecruitmentDetail = {
  title: string;
  content: string;
  applicant: number;
  capacity: number;
  startTime: string;
  endTime: string;
  deadline: string;
  createdAt: string;
  updatedAt: string;
  imageUrls: string[];
  isClosed: boolean;
};

const createRecruitmentDetail = (
  recruitment: RecruitmentDetailResponse,
): RecruitmentDetail => {
  const {
    recruitmentTitle: title,
    recruitmentContent: content,
    recruitmentApplicantCount: applicant,
    recruitmentCapacity: capacity,
    recruitmentStartTime: startTime,
    recruitmentEndTime: endTime,
    recruitmentDeadline: deadline,
    recruitmentCreatedAt: createdAt,
    recruitmentUpdatedAt: updatedAt,
    recruitmentImageUrls: imageUrls,
    recruitmentIsClosed: isClosed,
  } = recruitment;

  return {
    title,
    content,
    applicant,
    capacity,
    startTime,
    endTime,
    deadline,
    createdAt,
    updatedAt,
    imageUrls,
    isClosed,
  };
};

const useGetVolunteerDetail = (recruitmentId: number) =>
  useSuspenseQuery({
    queryKey: ['recruitment', 'detail', recruitmentId],
    queryFn: async () => {
      const response = (await getRecruitmentDetail(recruitmentId)).data;
      return createRecruitmentDetail(response);
    },
  });

export default useGetVolunteerDetail;
