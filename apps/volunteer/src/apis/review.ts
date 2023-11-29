import axiosInstance from 'shared/apis/axiosInstance';

type NewReviewParams = {
  applicantId: number;
  content: string;
  imageUrls: string[];
};

type UpdatedReviewParams = {
  content: string;
  imageUrls: string[];
};

export const getVolunteerReviewDetail = (reviewId: number) =>
  axiosInstance.get<{
    reviewId: number;
    content: string;
    imageUrls: string[];
  }>(`/reviews/${reviewId}`);

export const createVolunteerNewReview = (newReviewParams: NewReviewParams) =>
  axiosInstance.post<unknown, NewReviewParams>(
    '/volunteers/reviews',
    newReviewParams,
  );

export const updateVolunteerReview = (
  reviewId: string,
  updatedReviewParams: UpdatedReviewParams,
) =>
  axiosInstance.patch<unknown, UpdatedReviewParams>(
    `/volunteers/reviews/${reviewId}`,
    updatedReviewParams,
  );

export const deleteVolunteerReview = (reviewId: number) =>
  axiosInstance.delete(`/volunteers/reviews/${reviewId}`);

type ReviewOnShelterParams = {
  page: number;
  size: number;
};

type Review = {
  reviewId: number;
  volunteerEmail: string;
  volunteerTemperature: number;
  reviewCreatedAt: string;
  reviewContent: string;
  reviewImageUrls: string[];
};

type PageInfo = {
  totalElements: number;
  hasNext: boolean;
};

type ReviewOnShelterResponse = {
  pageInfo: PageInfo;
  reviews: Review[];
};

export const getVolunteerReviewsOnShelter = (
  shelterId: number,
  page: number,
  size: number,
) =>
  axiosInstance.get<ReviewOnShelterResponse, ReviewOnShelterParams>(
    `/shelters/${shelterId}/reviews`,
    {
      params: {
        page,
        size,
      },
    },
  );
