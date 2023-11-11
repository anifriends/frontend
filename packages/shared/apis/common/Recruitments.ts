import axiosInstance from '../axiosInstance';

type RecruitmentDetailResponse = {
  recruitmentTitle: string;
  recruitmentApplicantCount: number;
  recruitmentCapacity: number;
  recruitmentContent: string;
  recruitmentStartTime: string;
  recruitmentEndTime: string;
  recruitmentIsClosed: boolean;
  recruitmentDeadline: string;
  recruitmentCreatedAt: string;
  recruitmentUpdatedAt: string;
  recruitmentImageUrls: string[];
};

export const getRecruitmentDetail = (recruitmentId: number) =>
  axiosInstance.get<RecruitmentDetailResponse>(
    `/recruitments/${recruitmentId}`,
  );
