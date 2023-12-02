import { useSuspenseQuery } from '@tanstack/react-query';

import { getShelterInfoAPI } from '@/apis/shelter';
import { ShelterInfo } from '@/types/apis/shetler';

type ShelterProfile = {
  shelterId: number;
  imageUrl: string;
  name: string;
  email: string;
  phoneNumber: string;
  sparePhoneNumber: string;
  address: string;
  addressDetail: string;
  isOpenedAddress: boolean;
};

const createProfile = (response: ShelterInfo): ShelterProfile => {
  const {
    shelterId,
    shelterImageUrl,
    shelterName,
    shelterEmail,
    shelterPhoneNumber,
    shelterSparePhoneNumber,
    shelterAddress,
    shelterAddressDetail,
    shelterIsOpenedAddress,
  } = response;
  return {
    shelterId,
    imageUrl: shelterImageUrl,
    name: shelterName,
    email: shelterEmail,
    phoneNumber: shelterPhoneNumber,
    sparePhoneNumber: shelterSparePhoneNumber,
    address: shelterAddress,
    addressDetail: shelterAddressDetail,
    isOpenedAddress: shelterIsOpenedAddress,
  };
};

const useFetchShelterProfile = () =>
  useSuspenseQuery({
    queryKey: ['shelterProfile'],
    queryFn: async () => {
      const response = (await getShelterInfoAPI()).data;
      return createProfile(response);
    },
  });

export default useFetchShelterProfile;
