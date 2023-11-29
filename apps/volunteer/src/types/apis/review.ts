export type PageInfo = {
  totalElements: number;
  hasNext: boolean;
};

export type Pagination = {
  pageSize: number;
  pageNumber: number;
};

export type ReviewDetailResponse = {
  reviewId: number;
  reviewContent: string;
  reviewImageUrls: string[];
};

export type ReviewCreateRequest = {
  applicantId: number;
  content: string;
  imageUrls: string[];
};

export type ReviewUpdateRequest = {
  content: string;
  imageUrls: string[];
};

export type ReviewsOnShelterRequest = Pagination;

export type VolunteerReview = {
  reviewId: number;
  volunteerEmail: string;
  volunteerTemperature: number;
  reviewCreatedAt: string;
  reviewContent: string;
  reviewImageUrls: string[];
};

export type ReviewOnShelterResponse = {
  pageInfo: PageInfo;
  reviews: VolunteerReview[];
};
