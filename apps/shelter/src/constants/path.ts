const PATH = {
  VOLUNTEERS: {
    INDEX: 'volunteers',
    DETAIL: ':id',
    PROFILE: 'profile',
    SEARCH: 'search',
    WRITE: 'write',
    UPDATE: 'write/:id',
  },
  ANIMALS: {
    INDEX: 'animals',
    DETAIL: ':id',
    SEARCH: 'search',
    WRITE: 'write',
    UPDATE: 'write/:id',
  },
  CHATTINGS: {
    INDEX: 'chattings',
    ROOM: 'chattings/:id',
  },
  MYPAGE: {
    INDEX: 'mypage',
    REVIEWS: 'reviews',
  },
  SETTINGS: {
    INDEX: 'settings',
    ACCOUNT: 'account',
    PASSWORD: 'password',
  },
  MANAGE: {
    INDEX: 'manage',
    ATTENDANCE: 'attendance/:id',
    APPLY: 'apply/:id',
  },
  NOTIFICATIONS: 'notifications',
  SIGNUP: 'signup',
  SIGNIN: 'signin',
};

export default PATH;
