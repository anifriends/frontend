import { SigninRequestData } from 'shared/types/apis/auth';

import { PersonGenderEng } from '../gender';

export type SignupRequestData = SigninRequestData & {
  name: string;
  birthDate: string;
  phoneNumber: string;
  gender: PersonGenderEng;
};
