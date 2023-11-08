import { Box, Container } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

import { AppType } from '../types/app';
import BottomNavBar from './BottomNavBar';
import Header from './Header';

type LayoutProps = {
  appType: AppType;
};

export default function Layout({ appType }: LayoutProps) {
  return (
    <Container pos="relative" maxW="container.sm" h="100vh" p={0} centerContent>
      <Header appType={appType} />
      <Box width="100%" height="100%" pb="50px" as="main">
        <Outlet />
      </Box>
      <BottomNavBar />
    </Container>
  );
}
