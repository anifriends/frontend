import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from 'shared/store/authStore';

export default function WithLogin({ children }: { children: ReactNode }) {
  const { user } = useAuthStore();

  if (user) {
    children;
  }

  return <Navigate to="/signin" />;
}
