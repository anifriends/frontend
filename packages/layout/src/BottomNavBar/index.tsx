import AnimalsSelectedIcon from '@anifriends/assets/bottomNavBar/icon_animals_selected.svg';
import AnimalsUnselectedIcon from '@anifriends/assets/bottomNavBar/icon_animals_unselected.svg';
import ChattingsSelectedIcon from '@anifriends/assets/bottomNavBar/icon_chattings_selected.svg';
import ChattingsUnselectedIcon from '@anifriends/assets/bottomNavBar/icon_chattings_unselected.svg';
import MyPageSeletedIcon from '@anifriends/assets/bottomNavBar/icon_mypage_selected.svg';
import MyPageUnselectedIcon from '@anifriends/assets/bottomNavBar/icon_mypage_unselected.svg';
import VolunteersSelectedIcon from '@anifriends/assets/bottomNavBar/icon_volunteers_selected.svg';
import VolunteersUnselectedIcon from '@anifriends/assets/bottomNavBar/icon_volunteers_unselected.svg';
import { AlertModal } from '@anifriends/components';
import { PAGE_TYPE } from '@anifriends/constants';
import { usePageType } from '@anifriends/hooks';
import { useAuthStore } from '@anifriends/store';
import { Flex, useDisclosure } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import NavBarButton from './NavBarButton';
import { useBottomNavBar } from './useBottomNavBar';

export default function BottomNavBar() {
  const { pageType } = usePageType();
  const { isBottomNavBarVisible } = useBottomNavBar(pageType);
  const { user } = useAuthStore();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();

  const goVolunteers = () => navigate('/volunteers');
  const goAnimals = () => navigate('/animals');
  const goChattings = () => navigate('/chattings');
  const goMyPage = () => (user ? navigate('/mypage') : onOpen());
  const goLoginPage = () => {
    navigate('/signin');
    onClose();
  };

  return (
    isBottomNavBarVisible && (
      <>
        <Flex
          bgColor="white"
          w="100%"
          h="50px"
          px={4}
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
            selected={pageType === PAGE_TYPE.VOLUNTEERS}
            onClick={goVolunteers}
            buttonImageSrc={[VolunteersUnselectedIcon, VolunteersSelectedIcon]}
            buttonText="봉사"
          />
          <NavBarButton
            selected={pageType === PAGE_TYPE.ANIMALS}
            onClick={goAnimals}
            buttonImageSrc={[AnimalsUnselectedIcon, AnimalsSelectedIcon]}
            buttonText="입양"
          />
          <NavBarButton
            selected={pageType === PAGE_TYPE.CHATTINGS}
            onClick={goChattings}
            buttonImageSrc={[ChattingsUnselectedIcon, ChattingsSelectedIcon]}
            buttonText="채팅"
          />
          <NavBarButton
            selected={pageType === PAGE_TYPE.MYPAGE}
            onClick={goMyPage}
            buttonImageSrc={[MyPageUnselectedIcon, MyPageSeletedIcon]}
            buttonText="마이"
          />
        </Flex>
        <AlertModal
          isOpen={isOpen}
          onClose={onClose}
          modalTitle="로그인 페이지로 이동하기"
          modalContent={`로그인이 필요한 서비스입니다.\n로그인 페이지로 이동하시겠습니까?`}
          btnTitle="로그인하기"
          onClick={goLoginPage}
        />
      </>
    )
  );
}
