import { useSearchHeaderStore } from '@anifriends/store';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

type KeywordFilter = {
  keyword: string;
};

const parseSearchParams = <SearchFilter>(
  searchParams: URLSearchParams,
): Partial<SearchFilter> => {
  const searchFilter: Partial<SearchFilter> = {};

  for (const [key, value] of searchParams) {
    searchFilter[key as keyof SearchFilter] =
      value as SearchFilter[keyof SearchFilter];
  }

  return searchFilter;
};

const serializeSearchFilter = <SearchFilter>(
  searchFilter: Partial<SearchFilter>,
): URLSearchParams => {
  const searchFilterEntries = Object.entries(searchFilter);
  const searchParams = new URLSearchParams();

  for (const [key, value] of searchFilterEntries) {
    if (value) {
      searchParams.append(key, String(value));
    }
  }

  return searchParams;
};

export const useSearchFilter = <SearchFilter extends KeywordFilter>(
  filter: Partial<SearchFilter> = {},
): [Partial<SearchFilter>, (filter: Partial<SearchFilter>) => void] => {
  const setKeyword = useSearchHeaderStore((state) => state.setKeyword);

  const [searchFilter, setSearchFilter] =
    useState<Partial<SearchFilter>>(filter);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const params: Partial<SearchFilter> = parseSearchParams(searchParams);

    if (params.keyword) {
      setKeyword(params.keyword);
    }

    setSearchFilter(params);
  }, [searchParams]);

  const setSearchFilterValue = (filterValue: Partial<SearchFilter>) => {
    const newSearchFilter = { ...searchFilter, ...filterValue };
    const newSearchParams = serializeSearchFilter(newSearchFilter);

    setSearchFilter(newSearchFilter);
    setSearchParams(newSearchParams, { replace: true });
  };

  return [searchFilter, setSearchFilterValue];
};
