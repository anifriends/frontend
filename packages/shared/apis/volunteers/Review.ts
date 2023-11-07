import axiosInstance from 'apis/axiosInstance';

type NewReviewParams = {
  applicantId: number;
  content: string;
  imageUrls: string[];
};

type UpdatedReviewParams = {
  content: string;
  imageUrls: string[];
};

export const getReviewDetail = (reviewId: number) =>
  axiosInstance.get<{
    reviewId: number;
    content: string;
    imageUrls: string[];
  }>(`/reviews/${reviewId}`);

export const createNewReview = (newReviewParams: NewReviewParams) =>
  axiosInstance.post<unknown, NewReviewParams>(
    '/volunteers/reviews',
    newReviewParams,
  );

export const updateReview = (
  reviewId: string,
  updatedReviewParams: UpdatedReviewParams,
) =>
  axiosInstance.patch<unknown, UpdatedReviewParams>(
    `/volunteers/reviews/${reviewId}`,
    updatedReviewParams,
  );

export const deleteReview = (reviewId: string) =>
  axiosInstance.delete(`/volunteers/reviews/${reviewId}`);

type ReviewOnShelterParams = {
  pageNumber: number;
  pageSize: number;
};

type Review = {
  reviewId: number;
  volunteerEmail: string;
  volunteerTemperature: number;
  reviewCreatedAt: string;
  reviewComtent: string;
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

export const getReviewsOnShelter = (
  shelterId: number,
  pageNumber: number,
  pageSize: number,
) =>
  axiosInstance.get<ReviewOnShelterResponse, ReviewOnShelterParams>(
    `/volunteers/shelters/${shelterId}/reviews`,
    {
      params: {
        pageNumber,
        pageSize,
      },
    },
  );
