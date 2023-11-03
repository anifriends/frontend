import { ButtonGroup, Flex, Image } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import NotificationsIcon from '../../assets/icon_notifications.svg';
import SearchIcon from '../../assets/icon_search.svg';
import SettingsIcon from '../../assets/icon_settings.svg';
import { HeaderProps } from '../../types/header';

export default function DefaultHeader({ title }: HeaderProps) {
  const [iconVisibility, setIconVisibility] = useState({
    searchIcon: false,
    settingsIcon: false,
    notificationsIcon: true,
  });

  const { searchIcon, settingsIcon, notificationsIcon } = iconVisibility;

  useEffect(() => {
    setIconVisibility({
      searchIcon: false,
      settingsIcon: false,
      notificationsIcon: true,
    });
  }, []);

  return (
    <Flex
      bgColor="orange.400"
      color="white"
      fontSize="md"
      fontWeight="medium"
      pos="sticky"
      w="100%"
      h="44px"
      justify="center"
      align="center"
      top={0}
      as="header"
    >
      {title}
      <ButtonGroup pos="absolute" right="16px">
        {searchIcon && (
          <Image src={SearchIcon} alt="Search Icon" cursor="pointer" />
        )}
        {settingsIcon && (
          <Image src={SettingsIcon} alt="Settings Icon" cursor="pointer" />
        )}
        {notificationsIcon && (
          <Image
            src={NotificationsIcon}
            alt="Notifications Icon"
            cursor="pointer"
          />
        )}
      </ButtonGroup>
    </Flex>
  );
}
