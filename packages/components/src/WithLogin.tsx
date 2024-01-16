import { useAuthStore } from '@anifriends/store';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

export function WithLogin({ children }: { children: ReactNode }) {
  const { user } = useAuthStore();

  if (user) {
    return children;
  }

  return <Navigate to="/signin" />;
}
