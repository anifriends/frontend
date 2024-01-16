import { HEADER_TYPE } from '@anifriends/constants';
import { usePageType } from '@anifriends/hooks';
import { HeaderType } from '@anifriends/types';
import { useEffect, useState } from 'react';

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
