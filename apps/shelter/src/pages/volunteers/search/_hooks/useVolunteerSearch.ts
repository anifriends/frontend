import { useEffect } from 'react';
import useSearchHeaderStore from 'shared/store/searchHeaderStore';

import { RecruitSearchFilter } from '@/apis/recruitment';
import useFetchVolunteers from '@/pages/volunteers/hooks/useFetchVolunteers';
import useIntersect from '@/pages/volunteers/hooks/useIntersection';
import { useSearchFilter } from '@/pages/volunteers/search/_hooks/useSearchFilter';
import { useVolunteerSearchFilter } from '@/pages/volunteers/search/_hooks/useVolunteerSearchFilter';

const PAGE_SIZE = 10;

export const useVolunteerSearch = () => {
  const [searchFilter, setSearchFilter] =
    useSearchFilter<RecruitSearchFilter>();

  const { volunteerSearchFilter, setVolunteerSearchFilter } =
    useVolunteerSearchFilter(searchFilter, setSearchFilter);

  const {
    data: { pages },
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useFetchVolunteers(PAGE_SIZE, searchFilter);

  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  });

  useEffect(() => {
    if (Object.keys(searchFilter).length === 0) {
      return;
    }

    fetchNextPage();
  }, [searchFilter]);

  const [setOnSearch, setKeyword] = useSearchHeaderStore((state) => [
    state.setOnSearch,
    state.setKeyword,
  ]);

  useEffect(() => {
    setOnSearch((keyword) => setSearchFilter({ keyword }));

    return () => {
      setKeyword('');
      setOnSearch(() => {});
    };
  }, []);

  return {
    ref,
    isSearched: Boolean(searchFilter.keyword),
    recruitmentList: pages.flatMap(({ recruitments }) => recruitments),
    volunteerSearchFilter,
    setVolunteerSearchFilter,
  };
};
