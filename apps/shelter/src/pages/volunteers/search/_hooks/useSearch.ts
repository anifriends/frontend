import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useSearchHeaderStore from 'shared/store/searchHeaderStore';

export const useSearch = <Filter>(onSearch: (filter: Filter) => void) => {
  const setKeyword = useSearchHeaderStore((state) => state.setKeyword);

  const [filter, setFilter] = useState<Filter>({} as Filter);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = useCallback(() => {
    // TODO: search API 호출
    onSearch(filter);
  }, [onSearch, filter]);

  const handlekeywordSubmit = useCallback(
    (keyword: string) => {
      setSearchParams({ keyword: keyword });
      setFilter((filter) => {
        return { ...filter, keyword };
      });
      handleSearch();
    },
    [setSearchParams, handleSearch],
  );

  useEffect(() => {
    for (const [key, value] of searchParams) {
      if (value) {
        if (key === 'keyword') {
          setKeyword(value);
        }
        setFilter((filter) => {
          return { ...filter, [key]: value };
        });
      }
    }

    if (searchParams.size > 0) {
      handleSearch();
    }
  }, [searchParams]);

  return { filter, handlekeywordSubmit };
};
