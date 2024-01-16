import { create } from 'zustand';

type SearchFunction = (keyword: string) => void;

interface SearchHeaderState {
  keyword: string;
  onSearch: SearchFunction;
}

interface SearchHeaderActions {
  setKeyword: (keyword: string) => void;
  setOnSearch: (onSearch: SearchFunction) => void;
}

export const useSearchHeaderStore = create<
  SearchHeaderState & SearchHeaderActions
>((set) => ({
  keyword: '',
  onSearch: () => {},
  setKeyword: (keyword: string) => set(() => ({ keyword })),
  setOnSearch: (onSearch: SearchFunction) => set(() => ({ onSearch })),
}));
