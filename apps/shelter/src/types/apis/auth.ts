import { SigninRequestData } from '@anifriends/types';

export type SignupRequestData = SigninRequestData & {
  name: string;
  address: string;
  addressDetail: string;
  phoneNumber: string;
  sparePhoneNumber: string;
  isOpenedAddress: boolean;
};
