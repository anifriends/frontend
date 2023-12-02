import { create } from 'zustand';

export type User = {
  accessToken: string;
  userId: number;
};

interface AuthState {
  user: User | null;
}

interface AuthActions {
  setUser: (user: User | null) => void;
}

const useAuthStore = create<AuthState & AuthActions>((set) => ({
  user: null,
  setUser: (user: User | null) => {
    set({ user });
  },
}));

export default useAuthStore;
