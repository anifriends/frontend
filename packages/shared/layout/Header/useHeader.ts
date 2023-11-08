import { useEffect, useState } from 'react';

import HEADER_TYPE from '../../constants/headerType';
import { usePageType } from '../../hooks/usePageType';
import { HeaderType } from '../../types/header';
import { getHeaderType } from './utils';

export const useHeader = () => {
  const { pageType } = usePageType();
  const [headerType, setHeaderType] = useState<HeaderType>(HEADER_TYPE.DEFAULT);

  useEffect(() => {
    if (pageType) {
      setHeaderType(getHeaderType(pageType));
    }
  }, [pageType]);

  return { headerType };
};
