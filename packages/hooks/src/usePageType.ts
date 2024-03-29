import { PageType } from '@anifriends/types';
import { useEffect, useState } from 'react';
import { useMatches } from 'react-router-dom';

export const usePageType = () => {
  const [pageType, setPageType] = useState<PageType>();

  const match = useMatches().at(-1);

  useEffect(() => {
    const page = match?.id;

    setPageType(page as PageType);
  }, [match]);

  return { pageType };
};
