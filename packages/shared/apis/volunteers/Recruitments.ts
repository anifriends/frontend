import axiosInstance from 'apis/axiosInstance';

export const ApplyRecruitments = (recruitmentId: string) =>
  axiosInstance.post(`/volunteers/recruitments/${recruitmentId}/apply`);

type PageInfo = {
  totalElements: number;
  hasNext: boolean;
};

type Recruitment = {
  recruitmentId: number;
  title: string;
  startTime: string;
  endTime: string;
  isClosed: boolean;
  applicantCount: number;
  capacity: number;
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
};

export const getRecruitments = (recruitSearchParams: RecruitSearchParams) =>
  axiosInstance.get<
    {
      pageInfo: PageInfo;
      recruitments: Recruitment[];
    },
    RecruitSearchParams
  >('/volunteers/recruitments', {
    params: recruitSearchParams,
  });
