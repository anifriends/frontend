import { useSearchFilter, useSearchKeyword } from '@anifriends/hooks';
import { ChangeEvent } from 'react';

import { SearchFilter } from '@/pages/volunteers/search/_types/filter';

export const useRecruitmentSearch = () => {
  const [searchFilter, setSearchFilter] = useSearchFilter<SearchFilter>();

  const setKeywordFilter = (keyword: string) => setSearchFilter({ keyword });

  useSearchKeyword(setKeywordFilter);

  const handleChangeSearchFilter = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;

    setSearchFilter({ [name]: value });
  };

  return {
    searchFilter,
    isKeywordSearched: Boolean(searchFilter.keyword),
    handleChangeSearchFilter,
  };
};
