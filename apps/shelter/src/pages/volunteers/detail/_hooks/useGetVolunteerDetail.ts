import { useQuery } from '@tanstack/react-query';
import {
  getRecruitmentDetail,
  RecruitmentDetailResponse,
} from 'shared/apis/common/Recruitments';

const createRecruitmentDetail = (recruitment: RecruitmentDetailResponse) => {
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
  useQuery({
    queryKey: ['recruitment', 'detail', recruitmentId],
    queryFn: async () => {
      const response = (await getRecruitmentDetail(recruitmentId)).data;
      return createRecruitmentDetail(response);
    },
    initialData: {
      title: '',
      content: '',
      applicant: 0,
      capacity: 0,
      startTime: '',
      endTime: '',
      deadline: '',
      createdAt: '',
      updatedAt: '',
      imageUrls: [],
      isClosed: false,
    },
  });

export default useGetVolunteerDetail;
