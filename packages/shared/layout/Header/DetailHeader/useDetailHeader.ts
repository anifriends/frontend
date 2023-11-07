import { useEffect, useState } from 'react';

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
        appType === 'SHELTER_APP' &&
        (pageType === 'VOLUNTEERS_DETAIL' || pageType === 'ANIMALS_DETAIL')
      ) {
        setIconVisibility({ menuIcon: true });
      }
    }
  }, [appType, pageType]);

  return { title, iconVisibility };
};
