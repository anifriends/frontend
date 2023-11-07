import { Button, Card, HStack, Image, Text } from '@chakra-ui/react';
import React from 'react';

import SettingIcon from '../assets/icon_menu.svg';

type ReviewItemProps = {
  children: React.ReactNode;
  content: string;
  images: string[];
  onClick: VoidFunction;
};

export default function ReviewItem({
  children,
  content,
  images,
  onClick,
}: ReviewItemProps) {
  return (
    <Card p={4} w="342px" h="273px" gap={3.5}>
      {children}
      <Button
        minW={5}
        w={5}
        h={5}
        p={0}
        bgColor="transparent"
        color="gray.500"
        pos="absolute"
        top={4}
        right={4}
        onClick={onClick}
      >
        <Image src={SettingIcon} alt="setting icon" w="full" h="full" />
      </Button>
      <Text fontSize="xs" lineHeight={4}>
        {content}
      </Text>
      <HStack
        spacing={1.5}
        overflowX="scroll"
        sx={{
          '::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {images.map((src, index) => (
          <Image
            w="8.75rem"
            h="8.75rem"
            src={src}
            key={index}
            flexShrink={0}
            borderRadius={2.5}
          />
        ))}
      </HStack>
    </Card>
  );
}
