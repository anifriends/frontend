import axiosInstance from 'api/axiosInstance';

type ReviewDetailResponse = {
  content: string;
  shelterName: string;
  shelterImageUrl: string;
  imageUrls: string[];
};

type NewReviewParams = {
  applicantId: number;
  content: string;
  imageUrls: string[];
};

type NewReviewResponse = {
  reviewID: string;
};

type ShelterInfoResponse = {
  name: string;
  imageUrl: string;
  address: string;
  email: string;
};

type UpdatedReviewParams = {
  content: string;
  imageUrls: string[];
};

export const getReviewDetail = (reviewId: number) =>
  axiosInstance.get<ReviewDetailResponse>(`/reviews/${reviewId}`);

export const createNewReview = (newReviewParams: NewReviewParams) =>
  axiosInstance.post<NewReviewResponse, NewReviewParams>(
    '/reviews',
    newReviewParams,
  );

export const getShelterInfo = (recruitmentId: number) =>
  axiosInstance.get<ShelterInfoResponse>(
    `/recruitments/${recruitmentId}/shelters`,
  );

export const updateReview = (
  reviewId: string,
  updatedReviewParams: UpdatedReviewParams,
) =>
  axiosInstance.patch<UpdatedReviewParams, unknown>(
    `/reviews/${reviewId}`,
    updatedReviewParams,
  );

export const deleteReview = (reviewId: string) =>
  axiosInstance.delete(`/reviews/${reviewId}`);

type ReviewOnShelterParams = {
  pageNumber: number;
  pageSize: number;
};

type Review = {
  reviewId: number;
  email: string;
  temperature: number;
  createdAt: Date;
  comtent: string;
  imageUrls: string[];
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
    `/shelters/${shelterId}/reviews`,
    {
      params: {
        pageNumber,
        pageSize,
      },
    },
  );
