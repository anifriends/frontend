import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { getShelterInfoAPI, updateAddressStatusAPI } from '@/apis/shelter';
import { ShelterInfo } from '@/types/apis/shetler';

type ShelterProfile = {
  shelterName: string;
  email: string;
  phoneNumber: string;
  sparePhoneNumber: string;
  shelterAddress: string;
  isAddressPublic: boolean;
};

const createProfile = (response: ShelterInfo): ShelterProfile => {
  const {
    shelterName,
    shelterEmail,
    shelterPhoneNumber,
    shelterSparePhoneNumber,
    shelterAddressDetail,
    shelterIsOpenedAddress,
  } = response;
  return {
    shelterName: shelterName,
    email: shelterEmail,
    phoneNumber: shelterPhoneNumber,
    sparePhoneNumber: shelterSparePhoneNumber,
    shelterAddress: shelterAddressDetail,
    isAddressPublic: shelterIsOpenedAddress,
  };
};

export const useMyPage = () => {
  const [isAddressPublic, setIsAddressPublic] = useState(false);

  const getShelterInfo = async (): Promise<ShelterProfile> => {
    const response = await getShelterInfoAPI();
    setIsAddressPublic(response.shelterIsOpenedAddress);

    return createProfile(response);
  };

  const updateAddressStatus = async () => {
    try {
      await updateAddressStatusAPI(!isAddressPublic);
      setIsAddressPublic(!isAddressPublic);
    } catch (error) {
      console.error(error);
    }
  };

  const { data } = useQuery({
    queryKey: ['shelterProfile'],
    queryFn: getShelterInfo,
    initialData: {
      shelterName: '',
      email: '',
      phoneNumber: '',
      sparePhoneNumber: '',
      shelterAddress: '',
      isAddressPublic: false,
    },
  });

  return { shelterProfile: data, isAddressPublic, updateAddressStatus };
};
