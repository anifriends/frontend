import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from 'shared/store/authStore';

export default function WithLogin({ children }: { children: ReactNode }) {
  const { user } = useAuthStore();
  console.log(user);

  if (user) {
    return children;
  }

  return <Navigate to="/signin" />;
}
