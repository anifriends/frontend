import axiosInstance from 'shared/apis/axiosInstance';

export const ApplyRecruitments = (recruitmentId: string) =>
  axiosInstance.post(`/recruitments/${recruitmentId}/apply`);

type PageInfo = {
  totalElements: number;
  hasNext: boolean;
};

type Recruitment = {
  recruitmentId: number;
  recruitmentTitle: string;
  recruitmentStartTime: string;
  recruitmentEndTime: string;
  recruitmentIsClosed: boolean;
  recruitmentApplicantCount: number;
  recruitmentCapacity: number;
  shelterName: string;
  shelterImageUrl: string;
};

type RecruitSearchParams = {
  keyword: string;
  startDate: string;
  endDate: string;
  isClosed: boolean;
  content: boolean;
  title: boolean;
  shelterName: boolean;
  pageNumber: number;
  pageSize: number;
};

export const getRecruitments = (
  recruitSearchParams: Partial<RecruitSearchParams>,
) =>
  axiosInstance.get<
    {
      pageInfo: PageInfo;
      recruitments: Recruitment[];
    },
    RecruitSearchParams
  >('/recruitments', {
    params: recruitSearchParams,
  });
