import { Box, Button } from '@chakra-ui/react';

import CkCheck from '@/assets/CkCheck';

type ApprovedCountBoxProps = {
  approvedCount: number;
};

export default function ApprovedCountBox({
  approvedCount,
}: ApprovedCountBoxProps) {
  return (
    <Button
      zIndex={10}
      as={Box}
      alignItems="center"
      pos="fixed"
      bottom={5}
      right={6}
      rightIcon={<CkCheck />}
      bgColor="orange.400"
      color="white"
      borderRadius={50}
      _hover={{ bg: undefined }}
      _active={{ bg: undefined }}
    >
      {`${approvedCount}명 승인됨`}
    </Button>
  );
}
