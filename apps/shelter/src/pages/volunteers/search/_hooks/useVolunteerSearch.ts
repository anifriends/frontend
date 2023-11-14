import { useEffect, useState } from 'react';
import useSearchHeaderStore from 'shared/store/searchHeaderStore';

import { useVolunteerSearchFilter } from '@/pages/volunteers/search/_hooks/useVolunteerSearchFilter';

const DUMMY_RECRUITMENT = {
  recruitmentId: 1,
  recruitmentTitle: '봉사자를 모집합니다',
  recruitmentStartTime: '2021-11-08T11:44:30.327959',
  recruitmentEndTime: '2021-11-08T11:44:30.327959',
  recruitmentDeadline: '2021-11-08T11:44:30.327959',
  recruitmentIsClosed: false,
  recruitmentApplicantCount: 15,
  recruitmentCapacity: 15,
};

export const useVolunteerSearch = () => {
  const [recruitmentList, setRecruitmentList] = useState<unknown[]>([]);

  useEffect(() => {
    setRecruitmentList(Array.from({ length: 10 }, () => DUMMY_RECRUITMENT));
  }, []);

  const searchAPI = async () => {
    // TODO: API call
  };

  const {
    isSearched,
    setKeywordFilter,
    volunteerSearchFilter,
    setVolunteerSearchFilter,
  } = useVolunteerSearchFilter(searchAPI);

  const [setOnSearch, setKeyword] = useSearchHeaderStore((state) => [
    state.setOnSearch,
    state.setKeyword,
  ]);

  useEffect(() => {
    setOnSearch(setKeywordFilter);

    return () => {
      setKeyword('');
      setOnSearch(() => {});
    };
  }, []);

  return {
    isSearched,
    recruitmentList,
    volunteerSearchFilter,
    setVolunteerSearchFilter,
  };
};
