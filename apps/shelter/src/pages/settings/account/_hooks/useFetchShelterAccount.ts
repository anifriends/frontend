import { useQuery } from '@tanstack/react-query';

import { getShelterInfoAPI } from '@/apis/shelter';

const useFethShelterAccount = () => {
  return useQuery({
    queryKey: ['shelter', 'account'],
    queryFn: async () => (await getShelterInfoAPI()).data,
    select: (data) => {
      return {
        imageUrl: data.shelterImageUrl,
        email: data.shelterEmail,
        name: data.shelterName,
        address: data.shelterAddress,
        addressDetail: data.shelterAddressDetail,
        phoneNumber: data.shelterPhoneNumber,
        sparePhoneNumber: data.shelterSparePhoneNumber,
        isOpenedAddress: data.shelterIsOpenedAddress,
      };
    },
    initialData: {
      shelterId: 1,
      shelterImageUrl: '',
      shelterEmail: '',
      shelterName: '',
      shelterAddress: '',
      shelterAddressDetail: '',
      shelterPhoneNumber: '',
      shelterSparePhoneNumber: '',
      shelterIsOpenedAddress: false,
    },
  });
};

export default useFethShelterAccount;
