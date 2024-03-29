import { create } from 'zustand';

type DeleteFunction = (id: number) => void;

interface DetailHeaderState {
  onDelete: DeleteFunction;
}

interface DetailHeaderActions {
  setOnDelete: (onDelete: DeleteFunction) => void;
}

export const useDetailHeaderStore = create<
  DetailHeaderState & DetailHeaderActions
>((set) => ({
  onDelete: () => {},
  setOnDelete: (onDelete: DeleteFunction) => set(() => ({ onDelete })),
}));
