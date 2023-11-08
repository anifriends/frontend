import axiosInstance from 'apis/axiosInstance';

export const getVolunteerReviews = (
  volunteerId: number,
  pageNumber: number,
  pageSize: number,
) =>
  axiosInstance.get<
    {
      pageInfo: {
        totalElements: number;
        hasNext: boolean;
      };
      reviews: {
        reviewId: number;
        shelterName: string;
        reviewCreatedAt: string;
        reviewContent: string;
        reviewImageUrls: string[];
      }[];
    },
    {
      pageNumber: number;
      pageSize: number;
    }
  >(`/volunteers/${volunteerId}/reviews`, {
    params: {
      pageNumber,
      pageSize,
    },
  });
