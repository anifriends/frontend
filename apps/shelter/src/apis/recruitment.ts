import { axiosInstance } from '@anifriends/apis';

import {
  ApplicantsApprovalRequest,
  ApprovedRecruitmentApplicantsResponse,
  RecruitementsResponse,
  RecruitmentApplicantsResponse,
  RecruitmentApplicantUpdateRequest,
  RecruitmentCreateRequest,
  RecruitmentsRequest,
  RecruitmentUpdateRequest,
} from '@/types/apis/recruitment';

export const getShelterRecruitments = async (
  request: Partial<RecruitmentsRequest>,
) =>
  axiosInstance.get<RecruitementsResponse, RecruitmentsRequest>(
    '/shelters/recruitments',
    { params: request },
  );

export const createShelterRecruitment = (request: RecruitmentCreateRequest) =>
  axiosInstance.post<
    {
      recruitmentId: number;
    },
    RecruitmentCreateRequest
  >(`/shelters/recruitments`, request);

export const updateShelterRecruitment = (
  recruitmentId: number,
  request: RecruitmentUpdateRequest,
) =>
  axiosInstance.patch<unknown, RecruitmentUpdateRequest>(
    `/shelters/recruitments/${recruitmentId}`,
    request,
  );

export const deleteShelterRecruitment = (recruitmentId: number) =>
  axiosInstance.delete(`/shelters/recruitments/${recruitmentId}`);

export const closeShelterRecruitment = (recruitmentId: number) =>
  axiosInstance.patch(`/shelters/recruitments/${recruitmentId}/close`);

export const getShelterRecruitmentApplicants = (recruitmentId: number) =>
  axiosInstance.get<RecruitmentApplicantsResponse>(
    `/shelters/recruitments/${recruitmentId}/applicants`,
  );

export const updateShelterRecruitmentApplicant = (
  recruitmentId: number,
  applicantId: number,
  request: RecruitmentApplicantUpdateRequest,
) =>
  axiosInstance.patch<unknown, RecruitmentApplicantUpdateRequest>(
    `/shelters/recruitments/${recruitmentId}/applicants/${applicantId}`,
    request,
  );

export const getShelterApprovedRecruitmentApplicants = (
  recruitmentId: number,
) =>
  axiosInstance.get<ApprovedRecruitmentApplicantsResponse>(
    `/shelters/recruitments/${recruitmentId}/approval`,
  );

export const updateAttendanceAPI = (
  recruitmentId: number,
  request: ApplicantsApprovalRequest,
) =>
  axiosInstance.patch<unknown, ApplicantsApprovalRequest>(
    `/shelters/recruitments/${recruitmentId}/approval`,
    request,
  );
