export type PageInfo = {
  totalElements: number;
  hasNext: boolean;
};

export type Pagination = {
  pageSize: number;
  pageNumber: number;
};

export type Recruitment = {
  recruitmentId: number;
  recruitmentTitle: string;
  recruitmentStartTime: string;
  recruitmentEndTime: string;
  recruitmentDeadline: string;
  recruitmentIsClosed: boolean;
  recruitmentApplicantCount: number;
  recruitmentCapacity: number;
  shelterId: number;
  shelterName: string;
  shelterImageUrl: string;
};

export type RecruitementsResponse = {
  pageInfo: PageInfo;
  recruitments: Recruitment[];
};

export type RecruitmentSearchFilter = {
  keyword: string;
  startDate: string;
  endDate: string;
  closedFilter: 'IS_CLOSED' | 'IS_OPENED';
  keywordFilter: 'IS_TITLE' | 'IS_CONTENT' | 'IS_SHELTER_NAME';
};

export type RecruitmentsRequest = Partial<RecruitmentSearchFilter> & Pagination;
