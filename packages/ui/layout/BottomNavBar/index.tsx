import { Flex } from '@chakra-ui/react';

import AnimalsSelectedIcon from '../../assets/bottomNavBar/icon_animals_selected.svg';
import AnimalsUnselectedIcon from '../../assets/bottomNavBar/icon_animals_unselected.svg';
import ChattingsSelectedIcon from '../../assets/bottomNavBar/icon_chattings_selected.svg';
import ChattingsUnselectedIcon from '../../assets/bottomNavBar/icon_chattings_unselected.svg';
import MyPageSeletedIcon from '../../assets/bottomNavBar/icon_mypage_selected.svg';
import MyPageUnselectedIcon from '../../assets/bottomNavBar/icon_mypage_unselected.svg';
import VolunteersSelectedIcon from '../../assets/bottomNavBar/icon_volunteers_selected.svg';
import VolunteersUnselectedIcon from '../../assets/bottomNavBar/icon_volunteers_unselected.svg';
import NavBarButton from './NavBarButton';

export default function BottomNavBar() {
  const goVounteers = () => {};
  const goAnimals = () => {};
  const goChattings = () => {};
  const goMyPage = () => {};

  return (
    <Flex
      bgColor="white"
      w="100%"
      h="50px"
      px={4}
      justify="center"
      justifyContent="space-between"
      borderTop="1px solid"
      borderColor="gray.200"
      align="center"
      bottom={0}
      pos="absolute"
      zIndex={10}
      as="nav"
    >
      <NavBarButton
        selected={false}
        onClick={goVounteers}
        buttonImageSrc={[VolunteersUnselectedIcon, VolunteersSelectedIcon]}
        buttonText="봉사"
      />
      <NavBarButton
        selected={false}
        onClick={goAnimals}
        buttonImageSrc={[AnimalsUnselectedIcon, AnimalsSelectedIcon]}
        buttonText="입양"
      />
      <NavBarButton
        selected={false}
        onClick={goChattings}
        buttonImageSrc={[ChattingsUnselectedIcon, ChattingsSelectedIcon]}
        buttonText="채팅"
      />
      <NavBarButton
        selected={false}
        onClick={goMyPage}
        buttonImageSrc={[MyPageUnselectedIcon, MyPageSeletedIcon]}
        buttonText="마이"
      />
    </Flex>
  );
}
