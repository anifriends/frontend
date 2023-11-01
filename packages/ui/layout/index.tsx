import { Outlet } from 'react-router-dom';

import BottomNavBar from './BottomNavBar';
import Header from './Header';

export default function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
      <BottomNavBar />
    </div>
  );
}
