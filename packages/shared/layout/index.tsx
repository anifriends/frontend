import { Box, Container } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

import BottomNavBar from './BottomNavBar';
import Header from './Header';

export default function Layout() {
  return (
    <Container pos="relative" maxW="container.sm" h="100vh" p={0} centerContent>
      <Header />
      <Box width="100%" height="100%" pb="50px" as="main">
        <Outlet />
      </Box>
      <BottomNavBar />
    </Container>
  );
}
