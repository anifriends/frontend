import { PageType } from 'types/page';

type HeaderTitle = {
  [key in PageType]: string;
};

const headerTitle: HeaderTitle = {
  VOLUNTEERS: '봉사자 모집',
  VOLUNTEERS_DETAIL: '봉사자 모집 상세',
  VOLUNTEERS_PROFILE: '봉사자 프로필',
  VOLUNTEERS_SEARCH: '봉사자 모집글 검색',
  VOLUNTEERS_WRITE: '봉사자 모집글 작성',
  VOLUNTEERS_UPDATE: '봉사자 모집글 수정',
  ANIMALS: '유기보호 동물',
  ANIMALS_DETAIL: '유기보호 동물 상세',
  ANIMALS_SEARCH: '유기보호 동물 검색',
  ANIMALS_WRITE: '유기보호 동물 작성',
  ANIMALS_UPDATE: '유기보호 동물 수정',
  CHATTINGS: '채팅',
  CHATTINGS_ROOM: '채팅방',
  MYPAGE: '마이페이지',
  MYPAGE_REVIEWS: '봉사 후기',
  SETTINGS_ACCOUNT: '계정 정보 수정',
  SETTINGS_PASSWORD: '비밀 번호 수정',
  MANAGE_ATTENDANCE: '봉사자 출석 관리',
  MANAGE_APPLY: '봉사자 신청 현황',
  NOTIFICATIONS: '알림',
  SHELTERS_PROFILE: '보호소 프로필',
  SHELTERS_REVIEWS_WRITE: '봉사 후기 작성',
  SHELTERS_REVIEWS_UPDATE: '봉사 후기 수정',
  SIGNUP: '회원가입',
  SIGNIN: '로그인',
} as const;

export default headerTitle;
