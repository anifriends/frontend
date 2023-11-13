import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useSearchHeaderStore from 'shared/store/searchHeaderStore';

const parseSearchParams = (searchParams: URLSearchParams) => {
  const params: Record<string, string> = {};
  for (const [key, value] of searchParams) {
    params[key] = value;
  }
  return params;
};

export const useSearch = <Filter>(onSearch: (filter: Filter) => void) => {
  const setKeyword = useSearchHeaderStore((state) => state.setKeyword);

  const [filter, setFilter] = useState<Filter>({} as Filter);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    onSearch(filter);
  }, [filter, onSearch]);

  useEffect(() => {
    if (searchParams.size === 0) {
      return;
    }

    const params = parseSearchParams(searchParams);

    if (params.keyword) {
      setKeyword(params.keyword);
    }

    setFilter((prevFilter) => {
      return { ...prevFilter, ...params };
    });
  }, [searchParams, setKeyword]);

  const handleKeywordSubmit = useCallback(
    (keyword: string) => {
      setSearchParams({ keyword: keyword });
      setFilter((prevFilter) => {
        return { ...prevFilter, keyword };
      });
    },
    [setSearchParams],
  );

  return { filter, handleKeywordSubmit };
};
