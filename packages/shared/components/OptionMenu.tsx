import {
  Image,
  Menu,
  MenuButton,
  MenuButtonProps,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { ReactElement } from 'react';

import MenuIcon from '../assets/icon_menu.svg';

type OptionMenuProps = {
  children: ReactElement<typeof MenuItem> | ReactElement<typeof MenuItem>[];
} & Omit<MenuButtonProps, 'children'>;

export default function OptionMenu({ children, ...props }: OptionMenuProps) {
  return (
    <Menu autoSelect={false}>
      <MenuButton {...props}>
        <Image src={MenuIcon} alt="Menu Icon" />
      </MenuButton>
      <MenuList minW={32}>{children}</MenuList>
    </Menu>
  );
}
