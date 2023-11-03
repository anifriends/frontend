import { useEffect, useState } from 'react';
import { useMatches } from 'react-router-dom';

import { AppType } from '../../types/app';
import { HeaderType } from '../../types/header';
import { PageType } from '../../types/page';
import { getHeaderTitle, getHeaderType } from './utils';

export const useHeader = () => {
  const [appType, setAppType] = useState<AppType>();
  const [pageType, setPageType] = useState<PageType>();
  const [headerType, setHeaderType] = useState<HeaderType>('DEFAULT');
  const [title, setTitle] = useState<string>('');

  const match = useMatches().at(-1);

  useEffect(() => {
    const [app, page] = match?.id?.split(':') ?? [undefined, undefined];

    setAppType(app as AppType);
    setPageType(page as PageType);
  }, [match]);

  useEffect(() => {
    if (pageType) {
      setTitle(getHeaderTitle(pageType));
      setHeaderType(getHeaderType(pageType));
    }
  }, [appType, pageType]);

  return {
    headerType,
    title,
  };
};
