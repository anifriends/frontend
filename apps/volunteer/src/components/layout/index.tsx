import { Container } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import BottomNavBar from 'shared/layout/BottomNavBar';
import Header from 'shared/layout/Header';
import { HeaderOption } from 'shared/types/header';

export default function Layout() {
  const headerOption: HeaderOption = {
    onMenuClick: () => {},
    onSubmit: (keyword: string) => {
      console.log(keyword);
    },
  };

  return (
    <Container pos="relative" maxW="container.sm" h="100vh" p={0} centerContent>
      <Header headerOption={headerOption} />
      <Container height="100%" pb="50px" px="16px">
        <Outlet />
      </Container>
      <BottomNavBar />
    </Container>
  );
}
