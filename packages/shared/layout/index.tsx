import { Box, Container } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import useAccessTokenMutation from '../hooks/useAccessTokenMutation';
import { AppType } from '../types/app';
import BottomNavBar from './BottomNavBar';
import Header from './Header';

type LayoutProps = {
  appType: AppType;
};

export default function Layout({ appType }: LayoutProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { mutate } = useAccessTokenMutation();

  useEffect(() => {
    mutate(undefined, {
      onSuccess: () => {
        console.log('성공');
        if (pathname === '/') {
          navigate('/volunteers');
        }
      },
      onError: (error) => {
        console.log(error);
        navigate('/signin');
      },
    });
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
