import { Loader, LocalErrorBoundary } from '@anifriends/components';
import { useAuthStore } from '@anifriends/store';
import { AppType } from '@anifriends/types';
import { getItemFromStorage, removeItemFromStorage } from '@anifriends/utils';
import { Box, Container } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import BottomNavBar from './BottomNavBar';
import Header from './Header';

type LayoutProps = {
  appType: AppType;
};

export default function Layout({ appType }: LayoutProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { setUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const user = JSON.parse(getItemFromStorage(appType));
      setUser(user);
      // 로그인 성공시 그대로있거나 홈으로 이동
      if (pathname === '/') {
        navigate('/volunteers');
      }
    } catch (error) {
      setUser(null);
      removeItemFromStorage('token');

      if (pathname === '/') {
        navigate('/signin');
      }
    } finally {
      setIsLoading(false);
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

  if (isLoading) {
    return <Loader />;
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
