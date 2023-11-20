import {
  Button,
  Checkbox,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

export default function ManageAttendancePage() {
  return (
    <Flex dir="column" justifyContent="center">
      <TableContainer overflowX="hidden">
        <Table size="sm">
          <Thead bgColor="gray.100" color="gray.500">
            <Tr>
              <Th py={2}>
                <Checkbox colorScheme="orange" borderColor="orange.400" />
              </Th>
              <Th textAlign="center" fontWeight="normal">
                이름
              </Th>
              <Th textAlign="center" fontWeight="normal">
                성별
              </Th>
              <Th textAlign="center" fontWeight="normal">
                생년월일
              </Th>
              <Th textAlign="center" fontWeight="normal">
                전화번호
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr fontSize="sm" lineHeight={5}>
              <Td py={5}>
                <Checkbox colorScheme="orange" borderColor="orange.400" />
              </Td>
              <Td textAlign="center" fontWeight="semibold">
                김하나
              </Td>
              <Td textAlign="center">여성</Td>
              <Td textAlign="center">1999.12.31</Td>
              <Td textAlign="center">01012345678</Td>
            </Tr>
            <Tr>
              <Td py={5}>
                <Checkbox colorScheme="orange" borderColor="orange.400" />
              </Td>
              <Td
                textAlign="center"
                fontWeight="semibold"
                fontSize="sm"
                lineHeight={5}
              >
                김하나
              </Td>
              <Td textAlign="center" fontSize="sm" lineHeight={5}>
                여성
              </Td>
              <Td textAlign="center">1999.12.31</Td>
              <Td textAlign="center">01012345678</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <Button
        as="button"
        pos="fixed"
        bottom={0}
        width="90%"
        maxW="342px"
        bgColor="orange.400"
        color="white"
        borderRadius="0.625rem"
        _hover={{
          bg: undefined,
        }}
        _active={{
          bg: undefined,
        }}
      >
        출석 완료
      </Button>
    </Flex>
  );
}
