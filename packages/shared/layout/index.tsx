import { Box, Container } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import LocalErrorBoundary from '../components/LocalErrorBoundary';
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
  const { isPending } = useAccessTokenMutation();

  useEffect(() => {
    if (appType === 'VOLUNTEER_APP' && pathname === '/') {
      navigate('/volunteers');
    } else if (appType === 'SHELTER_APP') {
      navigate('/signin');
    }

    //TODO 액세스 토큰 갱신 api 정상화 되면 연결

    // mutate(undefined, {
    //   onSuccess: () => {
    //     if (pathname === '/') {
    //       navigate('/volunteers');
    //     }
    //   },
    //   onError: (error) => {
    //     console.warn(error);
    //     if (appType === 'SHELTER_APP') {
    //       navigate('/signin');
    //     }
    //     if (appType === 'VOLUNTEER_APP' && pathname === '/') {
    //       navigate('/volunteers');
    //     }
    //   },
    // });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isPending) {
    return <p>...로딩중</p>;
  }

  return (
    <Container pos="relative" maxW="container.sm" h="100vh" p={0} centerContent>
      <Header appType={appType} />
      <Box overflowY="scroll" width="100%" height="100%" as="main">
        <LocalErrorBoundary>
          <Outlet />
        </LocalErrorBoundary>
      </Box>
      <BottomNavBar />
    </Container>
  );
}
