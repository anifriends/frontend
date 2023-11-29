import { Button } from '@chakra-ui/react';
import { ReactNode } from 'react';

type RecruitItemButtonProps = {
  type: 'PRIMARY' | 'SECONDARY';
  onClick: VoidFunction;
  children: ReactNode;
};

export default function VolunteerRecruitItemButton({
  type,
  onClick,
  children,
}: RecruitItemButtonProps) {
  return (
    <Button
      w="100%"
      h={30}
      border="1px"
      borderRadius={10}
      color={type === 'PRIMARY' ? 'white' : 'orange.400'}
      bgColor={type === 'PRIMARY' ? 'orange.400' : 'white'}
      _hover={{ bg: undefined }}
      _active={{ bg: undefined }}
      fontSize="sm"
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
