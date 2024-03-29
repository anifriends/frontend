import MenuIcon from '@anifriends/assets/icon_menu.svg';
import {
  Card,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

function CustomMenu({
  onUpdate,
  onDelete,
}: Pick<ReviewItemProps, 'onUpdate' | 'onDelete'>) {
  return (
    <Menu placement="bottom-end" autoSelect={false}>
      <MenuButton
        minW={5}
        w={5}
        h={5}
        p={0}
        bgColor="transparent"
        color="gray.500"
        pos="absolute"
        top={4}
        right={4}
      >
        <Image src={MenuIcon} alt="menu icon" w="full" h="full" />
      </MenuButton>
      <MenuList minW="8rem">
        <MenuItem onClick={onUpdate}>수정하기</MenuItem>
        <MenuItem onClick={onDelete}>삭제하기</MenuItem>
        <MenuItem> 닫기</MenuItem>
      </MenuList>
    </Menu>
  );
}

type ReviewItemProps = {
  children: ReactNode;
  content: string;
  images?: string[];
  showMenuButton?: boolean;
  onUpdate?: VoidFunction;
  onDelete?: VoidFunction;
};

export function ReviewItem({
  children,
  content,
  images,
  showMenuButton = false,
  onUpdate,
  onDelete,
}: ReviewItemProps) {
  return (
    <Card
      p={4}
      gap={4}
      width="full"
      border="1px"
      borderColor="gray.200"
      borderRadius={8}
      boxShadow="none"
    >
      {children}
      {showMenuButton && <CustomMenu onUpdate={onUpdate} onDelete={onDelete} />}
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
        {images?.map((src, index) => (
          <Image
            w="8.75rem"
            h="8.75rem"
            src={src}
            key={index}
            flexShrink={0}
            borderRadius="0.625rem"
          />
        ))}
      </HStack>
    </Card>
  );
}
