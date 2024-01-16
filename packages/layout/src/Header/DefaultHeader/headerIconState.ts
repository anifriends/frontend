import { AppType } from '@anifriends/types';

import { DefaultHeaderIconVisibility } from './useDefaultHeader';

type DefaultHeaderIconState = {
  [key: string]: {
    [key in AppType]: DefaultHeaderIconVisibility;
  };
};

const defaultHeaderIconState: DefaultHeaderIconState = {
  VOLUNTEERS: {
    SHELTER_APP: {
      searchIcon: true,
      settingsIcon: false,
      notificationsIcon: true,
    },
    VOLUNTEER_APP: {
      searchIcon: true,
      settingsIcon: false,
      notificationsIcon: true,
    },
  },
  ANIMALS: {
    SHELTER_APP: {
      searchIcon: true,
      settingsIcon: false,
      notificationsIcon: true,
    },
    VOLUNTEER_APP: {
      searchIcon: false,
      settingsIcon: false,
      notificationsIcon: true,
    },
  },
  CHATTINGS: {
    SHELTER_APP: {
      searchIcon: false,
      settingsIcon: false,
      notificationsIcon: true,
    },
    VOLUNTEER_APP: {
      searchIcon: false,
      settingsIcon: false,
      notificationsIcon: true,
    },
  },
  MYPAGE: {
    SHELTER_APP: {
      searchIcon: false,
      settingsIcon: false,
      notificationsIcon: true,
    },
    VOLUNTEER_APP: {
      searchIcon: false,
      settingsIcon: true,
      notificationsIcon: true,
    },
  },
  SIGNUP: {
    SHELTER_APP: {
      searchIcon: false,
      settingsIcon: false,
      notificationsIcon: false,
    },
    VOLUNTEER_APP: {
      searchIcon: false,
      settingsIcon: false,
      notificationsIcon: false,
    },
  },
  SIGNIN: {
    SHELTER_APP: {
      searchIcon: false,
      settingsIcon: false,
      notificationsIcon: false,
    },
    VOLUNTEER_APP: {
      searchIcon: false,
      settingsIcon: false,
      notificationsIcon: false,
    },
  },
} as const;

export default defaultHeaderIconState;
