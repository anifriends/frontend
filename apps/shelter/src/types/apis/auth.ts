import { SigninRequestData } from 'shared/types/apis/auth';

export type SignupRequestData = SigninRequestData & {
  name: string;
  address: string;
  addressDetail: string;
  phoneNumber: string;
  sparePhoneNumber: string;
  isOpenedAddress: boolean;
};
