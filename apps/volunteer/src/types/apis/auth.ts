import type { PersonGenderEng, SigninRequestData } from '@anifriends/types';

export type SignupRequestData = SigninRequestData & {
  name: string;
  birthDate: string;
  phoneNumber: string;
  gender: PersonGenderEng;
};
