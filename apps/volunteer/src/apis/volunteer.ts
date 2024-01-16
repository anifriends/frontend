import { axiosInstance } from '@anifriends/apis';

import { PageInfo } from '@/types/apis/recruitment';
import {
  PagenationRequestParams,
  VolunteerApplicantsResponseData,
} from '@/types/apis/volunteer';

export type MyInfoResponse = {
  volunteerId: number;
  volunteerEmail: string;
  volunteerName: string;
  volunteerBirthDate: string;
  volunteerPhoneNumber: string;
  volunteerTemperature: number;
  completedVolunteerCount: number;
  volunteerImageUrl: string;
  volunteerGender: 'FEMALE' | 'MALE';
};

export const getMyVolunteerInfo = () =>
  axiosInstance.get<MyInfoResponse>('/volunteers/me');

export type UpdateUserInfoParams = {
  name: string;
  gender: 'FEMALE' | 'MALE';
  birthDate: string;
  phoneNumber: string;
  imageUrl?: string;
};

export const updateVolunteerUserInfo = (
  updateUserInfoParams: UpdateUserInfoParams,
) =>
  axiosInstance.patch<unknown, UpdateUserInfoParams>(
    '/volunteers/me',
    updateUserInfoParams,
  );

//봉사자가 신청한 봉사 리스트 조회
export const getVolunteerApplicants = (params: PagenationRequestParams) =>
  axiosInstance.get<VolunteerApplicantsResponseData>('/volunteers/applicants', {
    params,
  });

type Pagination = {
  page: number;
  size: number;
};

type MyReview = {
  reviewId: number;
  shelterId: number;
  shelterName: string;
  reviewCreatedAt: string;
  reviewContent: string;
  reviewImageUrls: string[];
};

export type MyReviewsResponse = {
  pageInfo: PageInfo;
  reviews: MyReview[];
};

export const getMyReviewsAPI = (page: number, size: number) =>
  axiosInstance.get<MyReviewsResponse, Pagination>('/volunteers/me/reviews', {
    params: {
      page,
      size,
    },
  });
