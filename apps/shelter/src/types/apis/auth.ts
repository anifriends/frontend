import { SigninParams } from 'shared/types/apis/auth';

export type SignupParams = SigninParams & {
  name: string;
  address: string;
  addressDetail: string;
  phoneNumber: string;
  sparePhoneNumber: string;
  isOpenedAddress: boolean;
};
