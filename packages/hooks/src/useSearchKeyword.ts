import { useSearchHeaderStore } from '@anifriends/store';
import { useEffect } from 'react';

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
