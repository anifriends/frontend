import axiosInstance from 'shared/apis/axiosInstance';

import {
  RecruitementsResponse,
  RecruitmentsRequest,
} from '@/types/apis/recruitment';

export const ApplyRecruitments = (recruitmentId: string) =>
  axiosInstance.post(`/recruitments/${recruitmentId}/apply`);

export const getRecruitments = (request: Partial<RecruitmentsRequest>) =>
  axiosInstance.get<RecruitementsResponse, RecruitmentsRequest>(
    '/recruitments',
    { params: request },
  );
