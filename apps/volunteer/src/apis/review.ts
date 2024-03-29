import { axiosInstance } from '@anifriends/apis';

import {
  ReviewCreateRequest,
  ReviewDetailResponse,
  ReviewOnShelterResponse,
  ReviewsOnShelterRequest,
  ReviewUpdateRequest,
} from '@/types/apis/review';

export const getVolunteerReviewDetail = (reviewId: number) =>
  axiosInstance.get<ReviewDetailResponse>(`/volunteers/reviews/${reviewId}`);

export const createVolunteerReview = (reqeust: ReviewCreateRequest) =>
  axiosInstance.post<unknown, ReviewCreateRequest>(
    '/volunteers/reviews',
    reqeust,
  );

export const updateVolunteerReview = (
  reviewId: number,
  reqeust: ReviewUpdateRequest,
) =>
  axiosInstance.patch<unknown, ReviewUpdateRequest>(
    `/volunteers/reviews/${reviewId}`,
    reqeust,
  );

export const deleteVolunteerReview = (reviewId: number) =>
  axiosInstance.delete(`/volunteers/reviews/${reviewId}`);

export const getVolunteerReviewsOnShelter = (
  shelterId: number,
  request: ReviewsOnShelterRequest,
) =>
  axiosInstance.get<ReviewOnShelterResponse, ReviewsOnShelterRequest>(
    `/shelters/${shelterId}/reviews`,
    { params: { ...request } },
  );
