import MenuIcon from '@anifriends/assets/icon_menu.svg';
import {
  Image,
  Menu,
  MenuButton,
  MenuButtonProps,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { ReactElement } from 'react';

type OptionMenuProps = {
  children: ReactElement<typeof MenuItem> | ReactElement<typeof MenuItem>[];
} & Omit<MenuButtonProps, 'children'>;

export function OptionMenu({ children, ...props }: OptionMenuProps) {
  return (
    <Menu autoSelect={false}>
      <MenuButton {...props}>
        <Image src={MenuIcon} alt="Menu Icon" />
      </MenuButton>
      <MenuList minW={32}>{children}</MenuList>
    </Menu>
  );
}
