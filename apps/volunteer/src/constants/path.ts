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
    ROOM: 'chattings/:id',
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
    REVIEWS_WRITE: 'reviews/write',
    REVIEWS_UPDATE: 'reviews/write/:id',
  },
  NOTIFICATIONS: 'notifications',
  SIGNUP: 'signup',
  SIGNIN: 'signin',
};

export default PATH;
