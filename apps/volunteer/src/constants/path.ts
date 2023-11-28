const PATH = {
  VOLUNTEERS: {
    INDEX: 'volunteers',
    DETAIL: ':id',
    SEARCH: 'search',
  },
  ANIMALS: {
    INDEX: 'animals',
    DETAIL: ':id',
  },
  CHATTINGS: {
    INDEX: 'chattings',
    ROOM: ':id',
  },
  MYPAGE: {
    INDEX: 'mypage',
    REVIEWS: 'mypage/reviews',
  },
  SETTINGS: {
    INDEX: 'settings',
    ACCOUNT: 'account',
    PASSWORD: 'password',
  },
  SHELTERS: {
    INDEX: 'shelters',
    PROFILE: 'profile/:id',
    REVIEWS_WRITE: ':shelterId/reviews/applicants/:applicantId/write',
    REVIEWS_UPDATE: ':shelterId/reviews/write/:reviewId',
  },
  NOTIFICATIONS: 'notifications',
  SIGNUP: 'signup',
  SIGNIN: 'signin',
};

export default PATH;
