import { PERAON_GENDER_ENG, PERAON_GENDER_KOR } from '@/constants/gender';

export type PersonGenderEng =
  (typeof PERAON_GENDER_ENG)[keyof typeof PERAON_GENDER_ENG];

export type PersonGenderKor =
  (typeof PERAON_GENDER_KOR)[keyof typeof PERAON_GENDER_KOR];
