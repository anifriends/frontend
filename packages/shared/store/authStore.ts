import { create } from 'zustand';

type User = {
  accessToken: string;
  userId: number;
};

interface AuthState {
  user: User | null;
}

interface AuthActions {
  setUser: (user: User) => void;
}

const useAuthStore = create<AuthState & AuthActions>((set) => ({
  user: null,
  setUser: (user: User) => {
    set({ user });
  },
}));

export default useAuthStore;
