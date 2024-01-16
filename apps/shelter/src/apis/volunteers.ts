import { axiosInstance } from '@anifriends/apis';

import {
  VolunteerCompletedsRequestParams,
  VolunteerProfileResponseData,
  VolunteerReviewsOnVolunteerResponseData,
  VoluteerRecruitmentsOnVolunteerResponseData,
} from '@/types/apis/volunteers';

export const getVolunteerProfile = (volunteerId: number) =>
  axiosInstance.get<VolunteerProfileResponseData>(
    `/shelters/volunteers/${volunteerId}/profile`,
  );

export const getVolunteerReviewsOnVolunteer = (
  volunteerId: number,
  params: VolunteerCompletedsRequestParams,
) =>
  axiosInstance.get<VolunteerReviewsOnVolunteerResponseData>(
    `/shelters/volunteers/${volunteerId}/reviews`,
    { params },
  );

export const getVolunteerRecruitmentsOnVolunteer = (
  volunteerId: number,
  params: VolunteerCompletedsRequestParams,
) =>
  axiosInstance.get<VoluteerRecruitmentsOnVolunteerResponseData>(
    `/shelters/volunteers/${volunteerId}/recruitments/completed`,
    { params },
  );
