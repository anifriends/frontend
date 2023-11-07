import { create } from 'zustand';

interface SearchHeaderState {
  keyword: string;
  onSearch: (keyword: string) => void;
}

interface SearchHeaderActions {
  setKeyword: (keyword: string) => void;
  setOnSearch: (onSearch: (keyword: string) => void) => void;
}

const useSearchHeader = create<SearchHeaderState & SearchHeaderActions>(
  (set) => ({
    keyword: '',
    onSearch: () => {},
    setKeyword: (keyword: string) => set(() => ({ keyword })),
    setOnSearch: (onSearch: (keyword: string) => void) =>
      set(() => ({ onSearch })),
  }),
);

export default useSearchHeader;
