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
  const { mutate, isPending } = useAccessTokenMutation();

  useEffect(() => {
    mutate(undefined, {
      //TODO 봉사자 어플 예외처리
      onSuccess: () => {
        if (pathname === '/') {
          navigate('/volunteers');
        }
      },
      onError: (error) => {
        console.warn(error);
        navigate('/signin');
      },
    });
  }, [mutate]);

  if (isPending) {
    return <p>...로딩중</p>;
  }

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
