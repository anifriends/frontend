import axiosInstance from '../axiosInstance';

export const getReviewList = (
  shelterId: number,
  pageNumber: number,
  pageSize: number,
) =>
  axiosInstance.get<{
    pageInfo: {
      totalElements: 32;
      hasNext: boolean;
    };
    reviews: {
      reviewId: number;
      reviewCreatedAt: string;
      reviewContent: string;
      reviewImageUrls: string[];
      volunteerName: string;
      volunteerTemperature: number;
      volunteerReviewCount: number;
      volunteerImageUrl: number;
    }[];
  }>(`/shelters/${shelterId}/reviews`, {
    params: {
      pageSize,
      pageNumber,
    },
  });
