import { Flex } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
  const [selected, setSelected] = useState<
    'volunteers' | 'animals' | 'chattings' | 'mypage'
  >();
  const navigate = useNavigate();

  const goVounteers = () => {
    setSelected('volunteers');
    navigate('/volunteers');
  };
  const goAnimals = () => {
    setSelected('animals');
    navigate('/animals');
  };
  const goChattings = () => {
    setSelected('chattings');
    navigate('/chattings');
  };
  const goMyPage = () => {
    setSelected('mypage');
    navigate('/mypage');
  };

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
        selected={selected === 'volunteers'}
        onClick={goVounteers}
        buttonImageSrc={[VolunteersUnselectedIcon, VolunteersSelectedIcon]}
        buttonText="봉사"
      />
      <NavBarButton
        selected={selected === 'animals'}
        onClick={goAnimals}
        buttonImageSrc={[AnimalsUnselectedIcon, AnimalsSelectedIcon]}
        buttonText="입양"
      />
      <NavBarButton
        selected={selected === 'chattings'}
        onClick={goChattings}
        buttonImageSrc={[ChattingsUnselectedIcon, ChattingsSelectedIcon]}
        buttonText="채팅"
      />
      <NavBarButton
        selected={selected === 'mypage'}
        onClick={goMyPage}
        buttonImageSrc={[MyPageUnselectedIcon, MyPageSeletedIcon]}
        buttonText="마이"
      />
    </Flex>
  );
}
