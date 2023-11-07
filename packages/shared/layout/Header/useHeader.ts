import { useEffect, useState } from 'react';

import { usePageType } from '../../hooks/usePageType';
import { HeaderType } from '../../types/header';
import { getHeaderType } from './utils';

export const useHeader = () => {
  const { pageType } = usePageType();
  const [headerType, setHeaderType] = useState<HeaderType>('DEFAULT');

  useEffect(() => {
    if (pageType) {
      setHeaderType(getHeaderType(pageType));
    }
  }, [pageType]);

  return { headerType };
};
