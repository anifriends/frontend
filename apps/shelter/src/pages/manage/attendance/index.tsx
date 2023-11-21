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
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { ChangeEvent, Suspense, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getShelterApprovedRecruitmentApplicants } from '@/apis/recruitment';

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

const attendanceQueryOptions = (recruitmentId: number) =>
  queryOptions({
    queryKey: ['attendance', recruitmentId],
    queryFn: () => getShelterApprovedRecruitmentApplicants(recruitmentId),
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });

type Gender = 'MALE' | 'FEMALE';

type Applicant = {
  volunteerId: number;
  applicantId: number;
  volunteerName: string;
  volunteerBirthDate: string;
  volunteerGender: Gender;
  volunteerPhoneNumber: string;
  volunteerAttendance: boolean;
};

function AttendanceForm() {
  const { id } = useParams();

  const [userList, setUserList] = useState<Applicant[]>([]);

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
  };

  const allCheckedHandler = ({
    target: { checked },
  }: ChangeEvent<HTMLInputElement>) => {
    setUserList(
      userList.map((user) => ({ ...user, volunteerAttendance: checked })),
    );
  };

  const {
    data: {
      data: { applicants },
    },
  } = useSuspenseQuery(attendanceQueryOptions(Number(id)));

  useEffect(() => {
    setUserList(applicants);
  }, [applicants]);

  const allChecked = userList.every(({ volunteerAttendance }) =>
    Boolean(volunteerAttendance),
  );

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
                  isChecked={allChecked}
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
                      isChecked={volunteerAttendance}
                      onChange={toggleCheck}
                      id={applicantId.toString()}
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

export default function ManageAttendancePage() {
  return (
    <Suspense fallback={<p>로딩 중...</p>}>
      <AttendanceForm />
    </Suspense>
  );
}
