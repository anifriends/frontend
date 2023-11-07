import { useEffect } from 'react';
import useSearchHeaderStore from 'shared/store/searchHeaderStore';

const handleSearchkeyword = (keyword: string) => {
  // TODO: VolunteerList 검색 API 호출
  console.log('[Search Volunteer] keyword:', keyword);
};

export default function VolunteersSearchPage() {
  const setOnSearch = useSearchHeaderStore((state) => state.setOnSearch);

  useEffect(() => {
    setOnSearch(handleSearchkeyword);

    return () => {
      setOnSearch(() => {});
    };
  }, [setOnSearch]);

  return <h1>VolunteersSearchPage</h1>;
}
