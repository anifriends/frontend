import { Container } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

import BottomNavBar from './BottomNavBar';
import Header from './Header';

export default function Layout() {
  return (
    <Container pos="relative" maxW="container.sm" h="100vh" p={0} centerContent>
      <Header />
      <Container maxW="inherit" height="100%" pb="50px" px={0} as="main">
        <Outlet />
      </Container>
      <BottomNavBar />
    </Container>
  );
}
