import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import BackIcon from '../../../assets/icon_back.svg';
import MenuIcon from '../../../assets/icon_menu.svg';
import { HeaderProps } from '../index';
import { useDetailHeader } from './useDetailHeader';

export default function DetailHeader({ appType }: HeaderProps) {
  const navigate = useNavigate();
  const { title, iconVisibility } = useDetailHeader(appType);

  const { menuIcon } = iconVisibility;

  const goBack = () => navigate(-1);

  return (
    <Flex
      bgColor="white"
      color="black"
      borderBottom="1px solid"
      borderColor="gray.200"
      pos="sticky"
      w="100%"
      py={2.5}
      justify="center"
      align="center"
      top={0}
      as="header"
    >
      <Box onClick={goBack} as="button" pos="absolute" left="1rem">
        <Image src={BackIcon} alt="Back Icon" />
      </Box>
      <Text fontSize="md" fontWeight="medium" h={6}>
        {title}
      </Text>
      {menuIcon && (
        <Box as="button" pos="absolute" right="1rem">
          <Image src={MenuIcon} alt="Menu Icon" />
        </Box>
      )}
    </Flex>
  );
}
