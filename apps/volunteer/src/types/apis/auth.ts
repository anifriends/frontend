import { SigninParams } from 'shared/types/apis/auth';

import { PersonGenderEng } from '../gender';

export type SignupParams = SigninParams & {
  name: string;
  birthDate: string;
  phoneNumber: string;
  gender: PersonGenderEng;
};
