import { SigninRequestData } from 'shared/types/apis/auth';
import { PersonGenderEng } from 'shared/types/gender';

export type SignupRequestData = SigninRequestData & {
  name: string;
  birthDate: string;
  phoneNumber: string;
  gender: PersonGenderEng;
};
