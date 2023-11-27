export type ShelterInfo = {
  shelterId: number;
  shelterEmail: string;
  shelterName: string;
  shelterImageUrl: string;
  shelterAddress: string;
  shelterAddressDetail: string;
  shelterPhoneNumber: string;
  shelterSparePhoneNumber: string;
  shelterIsOpenedAddress: boolean;
};

export type UpdateShelterInfo = {
  imageUrl?: string;
  name: string;
  address: string;
  addressDetail: string;
  phoneNumber: string;
  sparePhoneNumber: string;
  isOpenedAddress: boolean;
};
