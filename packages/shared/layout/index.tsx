import { Box, Container } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { AppType } from '../types/app';
import BottomNavBar from './BottomNavBar';
import Header from './Header';

type LayoutProps = {
  appType: AppType;
};

export default function Layout({ appType }: LayoutProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === '/') {
      navigate('/volunteers');
    }
  }, []);

  return (
    <Container pos="relative" maxW="container.sm" h="100vh" p={0} centerContent>
      <Header appType={appType} />
      <Box overflowY="scroll" width="100%" height="100%" as="main">
        <Outlet />
      </Box>
      <BottomNavBar />
    </Container>
  );
}
