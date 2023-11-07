import { Button, Card, HStack, Image, Text } from '@chakra-ui/react';
import React from 'react';

import SettingIcon from '../assets/icon_menu.svg';

type ReviewItemProps = {
  children: React.ReactNode;
  content: string;
  images: string[];
};

export default function ReviewItem({
  children,
  content,
  images,
}: ReviewItemProps) {
  return (
    <Card p={4} w="342px" h="273px" gap={3.5}>
      {children}
      <Button
        minW="1.25rem"
        w="1.25rem"
        h="1.25rem"
        p={0}
        bgColor="transparent"
        color="gray.500"
        pos="absolute"
        top={4}
        right={4}
      >
        <Image src={SettingIcon} alt="setting icon" w="full" h="full" />
      </Button>
      <Text fontSize="xs" lineHeight="4">
        {content}
      </Text>
      <HStack
        spacing="0.375rem"
        overflowX="scroll"
        sx={{
          '::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {images.map((src, index) => (
          <Image w="8.75rem" h="8.75rem" src={src} key={index} flexShrink={0} />
        ))}
      </HStack>
    </Card>
  );
}
