import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useSearchHeaderStore from 'shared/store/searchHeaderStore';

const parseSearchParams = (searchParams: URLSearchParams) => {
  const params: Record<string, string> = {};
  for (const [key, value] of searchParams) {
    params[key] = value;
  }
  return params;
};

export const useSearchFilter = <SearchFilter extends object>(
  onSearch: (filter: SearchFilter) => void,
): [SearchFilter, (filter: SearchFilter) => void] => {
  const setKeyword = useSearchHeaderStore((state) => state.setKeyword);

  const [filter, setFilter] = useState<SearchFilter>({} as SearchFilter);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (Object.keys(filter).length === 0) {
      return;
    }

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

    setFilter(params as SearchFilter);
  }, [searchParams, setKeyword]);

  const createSearchParams = (filter: SearchFilter) => {
    const keys = Object.keys(filter);

    return keys.reduce(
      (params, key) => {
        return filter[key as keyof SearchFilter]
          ? { ...params, [key]: String(filter[key as keyof SearchFilter]) }
          : params;
      },
      {} as Record<string, string>,
    );
  };

  const setFilterValue = (filter: SearchFilter) => {
    setSearchParams(createSearchParams(filter), { replace: true });
    setFilter(filter);
  };

  return [filter, setFilterValue];
};
