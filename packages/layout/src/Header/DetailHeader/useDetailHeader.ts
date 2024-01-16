import { APP_TYPE, PAGE_TYPE } from '@anifriends/constants';
import { usePageType } from '@anifriends/hooks';
import { AppType } from '@anifriends/types';
import { useEffect, useState } from 'react';

import { getHeaderTitle } from '../utils';

export type DetailHeaderIconVisibility = {
  menuIcon: boolean;
};

export const useDetailHeader = (appType: AppType) => {
  const { pageType } = usePageType();
  const [title, setTitle] = useState('');
  const [iconVisibility, setIconVisibility] =
    useState<DetailHeaderIconVisibility>({ menuIcon: false });

  useEffect(() => {
    if (pageType) {
      setTitle(getHeaderTitle(pageType));

      if (
        appType === APP_TYPE.SHELTER_APP &&
        (pageType === PAGE_TYPE.VOLUNTEERS_DETAIL ||
          pageType === PAGE_TYPE.ANIMALS_DETAIL)
      ) {
        setIconVisibility({ menuIcon: true });
      } else {
        setIconVisibility({ menuIcon: false });
      }
    }
  }, [appType, pageType]);

  return { title, iconVisibility };
};
