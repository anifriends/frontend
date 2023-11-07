import { Box, ButtonGroup, Flex, Image, Text } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';

import NotificationsIcon from '../../../assets/icon_notifications.svg';
import SearchIcon from '../../../assets/icon_search.svg';
import SettingsIcon from '../../../assets/icon_settings.svg';
import { HeaderProps } from '../index';
import { useDefaultHeader } from './useDefaultHeader';

export default function DefaultHeader({ appType }: HeaderProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { title, iconVisibility } = useDefaultHeader(appType);

  const { searchIcon, settingsIcon, notificationsIcon } = iconVisibility;

  const goSearch = () => navigate(`${pathname}/search`);
  const goSettings = () => navigate('/settings');
  const goNotifications = () => navigate('/notifications');

  return (
    <Flex
      bgColor="orange.400"
      color="white"
      lineHeight={6}
      pos="sticky"
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
  );
}
