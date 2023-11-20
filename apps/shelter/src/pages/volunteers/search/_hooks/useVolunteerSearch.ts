import { ChangeEvent, useEffect } from 'react';
import useSearchHeaderStore from 'shared/store/searchHeaderStore';

import { useSearchFilter } from '@/pages/volunteers/search/_hooks/useSearchFilter';
import { VolunteerSearchFilter } from '@/pages/volunteers/search/_types/filter';

export const useVolunteerSearch = () => {
  const [searchFilter, setSearchFilter] =
    useSearchFilter<VolunteerSearchFilter>();

  const [setOnSearch, setKeyword] = useSearchHeaderStore((state) => [
    state.setOnSearch,
    state.setKeyword,
  ]);

  const setKeywordFilter = (keyword: string) => setSearchFilter({ keyword });

  const handleChangeSearchFilter = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;

    setSearchFilter({ [name]: value });
  };

  useEffect(() => {
    setOnSearch(setKeywordFilter);

    return () => {
      setKeyword('');
      setOnSearch(() => {});
    };
  }, []);

  return {
    searchFilter,
    isKeywordSearched: Boolean(searchFilter.keyword),
    handleChangeSearchFilter,
  };
};
