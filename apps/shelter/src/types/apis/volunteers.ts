type PageInfo = {
  totalElements: number;
  hasNext: boolean;
};

type Recruitment = {
  recruitmentId: number;
  recruitmentTitle: string;
  recruitmentStartTime: string;
  shelterName: string;
};

type Review = {
  reviewId: number;
  shelterName: string;
  reviewCreatedAt: string;
  reviewContent: string;
  reviewImageUrls: string[];
};

export type VolunteerProfileResponseData = {
  volunteerEmail: string;
  volunteerName: string;
  volunteerTemperature: number;
  volunteerImageUrl: string;
  volunteerPhoneNumber: string;
};

export type VoluteerRecruitmentsOnVolunteerResponseData = {
  pageInfo: PageInfo;
  recruitments: Recruitment[];
};

export type VolunteerCompletedsRequestParams = {
  page: number;
  size: number;
};

export type VolunteerReviewsOnVolunteerResponseData = {
  pageInfo: PageInfo;
  reviews: Review[];
};
