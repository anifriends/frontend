import { Box, Image } from '@chakra-ui/react';

export type NavBarButtonProps = {
  onClick: VoidFunction;
  selected: boolean;
  buttonImageSrc: [string, string];
  buttonText: string;
};

export default function NavBarButton({
  onClick,
  selected,
  buttonImageSrc,
  buttonText,
}: NavBarButtonProps) {
  const [unselectedButton, selectedButton] = buttonImageSrc;

  return (
    <Box
      color={selected ? 'gray.600' : 'gray.500'}
      fontSize="9px"
      alignItems="center"
      justifyContent="center"
      onClick={onClick}
      as="button"
    >
      <Image src={selected ? selectedButton : unselectedButton} />
      {buttonText}
    </Box>
  );
}
