import { create } from 'zustand';

interface DetailHeaderState {
  onDelete: (id: number) => void;
}

interface DetailHeaderActions {
  setOnDelete: (onDelete: (id: number) => void) => void;
}

const useDetailHeaderStore = create<DetailHeaderState & DetailHeaderActions>(
  (set) => ({
    onDelete: () => {},
    setOnDelete: (onDelete: (id: number) => void) => set(() => ({ onDelete })),
  }),
);

export default useDetailHeaderStore;
