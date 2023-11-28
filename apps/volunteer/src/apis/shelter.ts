import axiosInstance from 'shared/apis/axiosInstance';

export const getSimpleShelterProfile = (shelterId: number) =>
  axiosInstance.get<{
    shelterName: string;
    shelterImageUrl: string;
    shelterAddress: string;
    shelterEmail: string;
  }>(`/shelters/${shelterId}/profile/simple`);

export const getShelterProfileDetail = (shelterId: number) =>
  axiosInstance.get<{
    shelterId: number;
    shelterName: string;
    shelterEmail: string;
    shelterImageUrl: string;
    shelterAddress: string;
    shelterAddressDetail: string;
    shelterPhoneNumber: string;
    shelterSparePhoneNumber: string;
  }>(`/shelters/${shelterId}/profile`);

export type RecruitmentOfShleter = {
  recruitmentId: number;
  recruitmentTitle: string;
  recruitmentStartTime: string;
  recruitmentDeadline: string;
  recruitmentApplicantCount: number;
  recruitmentCapacity: number;
};

type PageInfo = {
  totalElements: number;
  hasNext: boolean;
};

type RecruitmentsOfShelterResponse = {
  pageInfo: PageInfo;
  recruitments: RecruitmentOfShleter[];
};

type RecruitmentOfShelterRequest = {
  page: number;
  size: number;
};

export const getRecruitementsOfShelter = (
  shelterId: number,
  page: number,
  size: number,
) =>
  axiosInstance.get<RecruitmentsOfShelterResponse, RecruitmentOfShelterRequest>(
    `/shelters/${shelterId}/recruitments`,
    {
      params: {
        page,
        size,
      },
    },
  );
