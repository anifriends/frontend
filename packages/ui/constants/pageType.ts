import HEADER_TYPE from './headerType';

const PAGE_TYPE = {
  VOLUNTEERS: {
    title: '봉사자 모집',
    headerType: HEADER_TYPE.DEFAULT,
  },
  VOLUNTEERS_DETAIL: {
    title: '봉사자 모집 상세',
    headerType: HEADER_TYPE.DETAIL,
  },
  VOLUNTEERS_PROFILE: {
    title: '봉사자 프로필',
    headerType: HEADER_TYPE.DETAIL,
  },
  VOLUNTEERS_SEARCH: {
    title: '봉사자 모집글 검색',
    headerType: HEADER_TYPE.SEARCH,
  },
  VOLUNTEERS_WRITE: {
    title: '봉사자 모집글 작성',
    headerType: HEADER_TYPE.DETAIL,
  },
  VOLUNTEERS_UPDATE: {
    title: '봉사자 모집글 수정',
    headerType: HEADER_TYPE.DETAIL,
  },
  ANIMALS: {
    title: '유기보호 동물',
    headerType: HEADER_TYPE.DEFAULT,
  },
  ANIMALS_DETAIL: {
    title: '유기보호 동물 상세',
    headerType: HEADER_TYPE.DEFAULT,
  },
  ANIMALS_SEARCH: {
    title: '유기보호 동물 검색',
    headerType: HEADER_TYPE.SEARCH,
  },
  ANIMALS_WRITE: {
    title: '유기보호 동물 작성',
    headerType: HEADER_TYPE.DETAIL,
  },
  ANIMALS_UPDATE: {
    title: '유기보호 동물 수정',
    headerType: HEADER_TYPE.DETAIL,
  },
  CHATTINGS: {
    title: '채팅',
    headerType: HEADER_TYPE.DEFAULT,
  },
  CHATTINGS_ROOM: {
    title: '채팅방',
    headerType: HEADER_TYPE.DETAIL,
  },
  MYPAGE: {
    title: '마이페이지',
    headerType: HEADER_TYPE.DEFAULT,
  },
  MYPAGE_REVIEWS: {
    title: '봉사 후기',
    headerType: HEADER_TYPE.DETAIL,
  },
  SETTINGS_ACCOUNT: {
    title: '계정 정보 수정',
    headerType: HEADER_TYPE.DETAIL,
  },
  SETTINGS_PASSWORD: {
    title: '비밀 번호 수정',
    headerType: HEADER_TYPE.DETAIL,
  },
  MANAGE_ATTENDANCE: {
    title: '봉사자 출석 관리',
    headerType: HEADER_TYPE.DETAIL,
  },
  MANAGE_APPLY: {
    title: '봉사자 신청 현황',
    headerType: HEADER_TYPE.DETAIL,
  },
  NOTIFICATIONS: {
    title: '알림',
    headerType: HEADER_TYPE.DETAIL,
  },
  SHELTERS_PROFILE: {
    title: '보호소 프로필',
    headerType: HEADER_TYPE.DETAIL,
  },
  SHELTERS_REVIEWS_WRITE: {
    title: '봉사 후기 작성',
    headerType: HEADER_TYPE.DETAIL,
  },
  SHELTERS_REVIEWS_UPDATE: {
    title: '봉사 후기 수정',
    headerType: HEADER_TYPE.DETAIL,
  },
  SIGNUP: {
    title: '회원가입',
    headerType: HEADER_TYPE.DEFAULT,
  },
  SIGNIN: {
    title: '로그인',
    headerType: HEADER_TYPE.DEFAULT,
  },
} as const;

export default PAGE_TYPE;
