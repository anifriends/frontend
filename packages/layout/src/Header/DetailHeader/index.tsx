import BackIcon from '@anifriends/assets/icon_back.svg';
import { OptionMenu } from '@anifriends/components';
import { useDetailHeaderStore } from '@anifriends/store';
import { Box, Flex, Image, MenuItem, Text } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';

import { HeaderProps } from '../index';
import { useDetailHeader } from './useDetailHeader';

export default function DetailHeader({ appType }: HeaderProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { title, iconVisibility } = useDetailHeader(appType);
  const onDelete = useDetailHeaderStore((state) => state.onDelete);

  const { menuIcon } = iconVisibility;

  const goBack = () => navigate(-1);

  const handleUpdate = () => {
    const [, path, id] = pathname.split('/');

    navigate(`${path}/write/${id}`);
  };

  const handleDelete = () => {
    const [, , id] = pathname.split('/');

    onDelete(Number(id));
  };

  return (
    <Flex
      bgColor="white"
      color="black"
      borderBottom="1px solid"
      borderColor="gray.200"
      pos="sticky"
      zIndex={10}
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
        <OptionMenu pos="absolute" right="1rem">
          <MenuItem onClick={handleUpdate}>수정하기</MenuItem>
          <MenuItem onClick={handleDelete}>삭제하기</MenuItem>
        </OptionMenu>
      )}
    </Flex>
  );
}
