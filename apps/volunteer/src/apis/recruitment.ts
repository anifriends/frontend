import axiosInstance from 'shared/apis/axiosInstance';

import {
  RecruitementsResponse,
  RecruitmentsRequest,
} from '@/types/apis/recruitment';

export const applyRecruitments = (recruitmentId: number) =>
  axiosInstance.post(`/volunteers/recruitments/${recruitmentId}/apply`);

export const getRecruitments = (request: Partial<RecruitmentsRequest>) =>
  axiosInstance.get<RecruitementsResponse, RecruitmentsRequest>(
    '/recruitments',
    { params: request },
  );
