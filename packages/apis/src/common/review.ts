import { axiosInstance } from '../axiosInstance';

export const getVolunteerReviews = (
  volunteerId: number,
  page: number,
  size: number,
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
      page: number;
      size: number;
    }
  >(`/volunteers/${volunteerId}/reviews`, {
    params: {
      page,
      size,
    },
  });
