import { PERSON_GENDER_ENG, PERSON_GENDER_KOR } from '../constants/gender';

export type PersonGenderEng =
  (typeof PERSON_GENDER_ENG)[keyof typeof PERSON_GENDER_ENG];

export type PersonGenderKor =
  (typeof PERSON_GENDER_KOR)[keyof typeof PERSON_GENDER_KOR];
