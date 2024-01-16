import NotificationsIcon from '@anifriends/assets/icon_notifications.svg';
import SearchIcon from '@anifriends/assets/icon_search.svg';
import SettingsIcon from '@anifriends/assets/icon_settings.svg';
import { AlertModal } from '@anifriends/components';
import { useAuthStore } from '@anifriends/store';
import {
  Box,
  ButtonGroup,
  Flex,
  Image,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';

import { HeaderProps } from '../index';
import { useDefaultHeader } from './useDefaultHeader';

export default function DefaultHeader({ appType }: HeaderProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { title, iconVisibility } = useDefaultHeader(appType);
  const { user } = useAuthStore();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { searchIcon, settingsIcon, notificationsIcon } = iconVisibility;

  const goSearch = () => navigate(`${pathname}/search`);
  const goSettings = () => (user ? navigate('/settings') : onOpen());
  const goNotifications = () => (user ? navigate('/notifications') : onOpen());
  const goLoginPage = () => {
    navigate('/signin');
    onClose();
  };

  return (
    <>
      <Flex
        bgColor="orange.400"
        color="white"
        lineHeight={6}
        pos="sticky"
        zIndex={10}
        w="100%"
        py={2.5}
        justify="center"
        align="center"
        top={0}
        as="header"
      >
        <Text fontSize="md" fontWeight="medium" h={6}>
          {title}
        </Text>
        <ButtonGroup pos="absolute" right="1rem">
          {searchIcon && (
            <Box onClick={goSearch} as="button">
              <Image src={SearchIcon} alt="Search Icon" />
            </Box>
          )}
          {settingsIcon && (
            <Box onClick={goSettings} as="button">
              <Image src={SettingsIcon} alt="Settings Icon" />
            </Box>
          )}
          {notificationsIcon && (
            <Box onClick={goNotifications} as="button">
              <Image src={NotificationsIcon} alt="Notifications Icon" />
            </Box>
          )}
        </ButtonGroup>
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
  );
}
