import { useEffect } from 'react';

import useSearchHeaderStore from '../store/searchHeaderStore';

export const useSearchKeyword = (
  setKeywordFilter: (keyword: string) => void,
) => {
  const [setOnSearch, setKeyword, keyword] = useSearchHeaderStore((state) => [
    state.setOnSearch,
    state.setKeyword,
    state.keyword,
  ]);

  useEffect(() => {
    setOnSearch(setKeywordFilter);

    return () => {
      setKeyword('');
      setOnSearch(() => {});
    };
  }, []);

  return keyword;
};
