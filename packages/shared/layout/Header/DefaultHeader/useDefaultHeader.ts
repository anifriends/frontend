import { useEffect, useState } from 'react';

import { usePageType } from '../../../hooks/usePageType';
import { AppType } from '../../../types/app';
import { getHeaderTitle } from '../utils';
import defaultHeaderState from './headerIconState';

export type DefaultHeaderIconVisibility = {
  searchIcon: boolean;
  settingsIcon: boolean;
  notificationsIcon: boolean;
};

export const useDefaultHeader = (appType: AppType) => {
  const { pageType } = usePageType();
  const [title, setTitle] = useState('');
  const [iconVisibility, setIconVisibility] =
    useState<DefaultHeaderIconVisibility>({
      searchIcon: false,
      settingsIcon: false,
      notificationsIcon: false,
    });

  useEffect(() => {
    if (pageType) {
      setTitle(getHeaderTitle(pageType));

      const iconState = defaultHeaderState[pageType];

      if (iconState) {
        setIconVisibility(iconState[appType]);
      }
    }
  }, [appType, pageType]);

  return { title, iconVisibility };
};
