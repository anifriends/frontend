import { useSearchHeaderStore } from '@anifriends/store';
import { useEffect } from 'react';

const handleSearchkeyword = (keyword: string) => {
  // TODO: AnimalList 검색 API 호출
  console.log('[Search Animal] - keyword:', keyword);
};

export default function AnimalsSearchPage() {
  const setOnSearch = useSearchHeaderStore((state) => state.setOnSearch);

  useEffect(() => {
    setOnSearch(handleSearchkeyword);

    return () => {
      setOnSearch(() => {});
    };
  }, [setOnSearch]);

  return <h1>AnimalsSearchPage</h1>;
}
