import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, useEffect, useState } from 'react';

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
  const queryClient = useQueryClient();

  const { mutate: updateAddressStatus } = useMutation({
    mutationFn: async (event: ChangeEvent<HTMLInputElement>) => {
      updateAddressStatusAPI(!event.target.checked);
    },
    onSuccess: () => {
      const isOpenedAddress = !isAddressPublic;
      setIsAddressPublic(isOpenedAddress);
      queryClient.setQueryData(['shelterProfile'], (data: ShelterProfile) => ({
        ...data,
        isAddressPublic: isOpenedAddress,
      }));
    },
  });

  const { data } = useQuery({
    queryKey: ['shelterProfile'],
    queryFn: async () => {
      const response = (await getShelterInfoAPI()).data;
      return createProfile(response);
    },
  });

  const [isAddressPublic, setIsAddressPublic] = useState(
    data?.isAddressPublic ?? false,
  );

  useEffect(() => {
    if (data) {
      const { isAddressPublic } = data;
      setIsAddressPublic(isAddressPublic);
    }
  }, [data]);

  return { shelterProfile: data, isAddressPublic, updateAddressStatus };
};
