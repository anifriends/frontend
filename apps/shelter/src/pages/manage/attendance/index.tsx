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
import { ChangeEvent, useState } from 'react';

const DUMMY_USER = {
  volunteerId: 1,
  applicantId: 2,
  volunteerName: '김영희',
  volunteerBirthDate: '2021-11-08',
  volunteerGender: 'FEMALE',
  volunteerPhoneNumber: '010-1234-5678',
  volunteerAttendance: true,
};

const DUMMY_USER_LIST = Array.from({ length: 8 }, () => {
  return {
    ...DUMMY_USER,
    applicantId: Math.random(),
  };
});

export default function ManageAttendancePage() {
  const [userList, setUserList] = useState(DUMMY_USER_LIST);
  const [allCheckedAttendance, setAllCheckAttendance] = useState(() => {
    const attendanceUserList = userList.filter(({ volunteerAttendance }) =>
      Boolean(volunteerAttendance),
    );
    return Boolean(userList.length === attendanceUserList.length);
  });

  const toggleCheck = ({ target: { id } }: ChangeEvent) => {
    const updatedUserList = userList.map((user) =>
      user.applicantId.toString() === id
        ? { ...user, volunteerAttendance: !user.volunteerAttendance }
        : user,
    );

    const updatedApplicantCount = updatedUserList.reduce(
      (prev, { volunteerAttendance }) =>
        volunteerAttendance ? prev + 1 : prev,
      0,
    );

    setUserList(updatedUserList);
    setAllCheckAttendance(updatedApplicantCount === userList.length);
  };

  const allCheckedHandler = ({
    target: { checked },
  }: ChangeEvent<HTMLInputElement>) => {
    setUserList(
      userList.map((user) => ({ ...user, volunteerAttendance: checked })),
    );
    setAllCheckAttendance(checked);
  };

  return (
    <Flex dir="column" justifyContent="center">
      <TableContainer>
        <Table size="sm">
          <Thead bgColor="gray.100" color="gray.500">
            <Tr>
              <Th py={5} textAlign="center">
                <Checkbox
                  colorScheme="orange"
                  borderColor="orange.400"
                  isChecked={allCheckedAttendance}
                  onChange={allCheckedHandler}
                />
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
            {userList.map(
              ({
                volunteerId,
                applicantId,
                volunteerName,
                volunteerBirthDate,
                volunteerGender,
                volunteerPhoneNumber,
                volunteerAttendance,
              }) => (
                <Tr fontSize="sm" lineHeight={5} key={volunteerId}>
                  <Td py={5}>
                    <Checkbox
                      colorScheme="orange"
                      borderColor="orange.400"
                      id={applicantId.toString()}
                      isChecked={volunteerAttendance}
                      onChange={toggleCheck}
                    />
                  </Td>
                  <Td textAlign="center" fontWeight="semibold">
                    {volunteerName}
                  </Td>
                  <Td textAlign="center">
                    {volunteerGender === 'FEMALE' ? '여성' : '남성'}
                  </Td>
                  <Td textAlign="center">
                    {volunteerBirthDate.split('-').join('.')}
                  </Td>
                  <Td textAlign="center">
                    {volunteerPhoneNumber.split('-').join('')}
                  </Td>
                </Tr>
              ),
            )}
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
