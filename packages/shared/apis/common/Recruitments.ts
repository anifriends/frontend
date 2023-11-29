import axiosInstance from '../axiosInstance';

export type RecruitmentDetailResponse = {
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
  shelterId: number;
};

export const getRecruitmentDetail = (recruitmentId: number) =>
  axiosInstance.get<RecruitmentDetailResponse>(
    `/recruitments/${recruitmentId}`,
  );

// 봉사자가 완료한 봉사 모집글 리스트 조회
export const getCompletedVolunteers = (
  volunteerId: number,
  pageNumber: number,
  pageSize: number,
) =>
  axiosInstance.get<
    {
      pageInfo: {
        totalElements: number;
        hasNext: boolean;
      };
      recruitments: {
        recruitmentId: number;
        recruitmentTitle: string;
        recruitmentStartTime: string;
        shelterName: string;
      }[];
    },
    { pageNumber: number; pageSize: number }
  >(`/volunteers/${volunteerId}/recruitments/completed`, {
    params: {
      pageNumber,
      pageSize,
    },
  });

//보호소가 생성한 봉사 모집글 리스트 조회
export const getShelterRecruitment = (
  shelterId: number,
  pageNumber: number,
  pageSize: number,
) =>
  axiosInstance.get<
    {
      pageInfo: {
        totalElements: number;
        hasNext: boolean;
      };
      recruitments: {
        recruitmentId: number;
        recruitmentTitle: string;
        recruitmentStartTime: string;
        shelterName: string;
        recruitmentDeadline: string;
        recruitmentCapacity: number;
        recruitmentApplicantCount: number;
      }[];
    },
    { pageNumber: number; pageSize: number }
  >(`/shelters/${shelterId}/recruitments`, {
    params: {
      pageNumber,
      pageSize,
    },
  });
