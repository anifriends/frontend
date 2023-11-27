import { useEffect, useState } from 'react';

import APP_TYPE from '../../../constants/appType';
import PAGE_TYPE from '../../../constants/pageType';
import { usePageType } from '../../../hooks/usePageType';
import { AppType } from '../../../types/app';
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
