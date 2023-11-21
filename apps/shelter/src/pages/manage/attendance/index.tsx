import {
  Button,
  Checkbox,
  Flex,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import {
  queryOptions,
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { ChangeEvent, Suspense, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  getShelterApprovedRecruitmentApplicants,
  updateAttendanceAPI,
} from '@/apis/recruitment';
import { AttendanceStatus } from '@/types/apis/recruitment';

const attendanceQueryOptions = (recruitmentId: number) =>
  queryOptions({
    queryKey: ['attendance', recruitmentId],
    queryFn: () => getShelterApprovedRecruitmentApplicants(recruitmentId),
    select: ({ data }) => data,
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
  const { id } = useParams() as { id: string };

  const [userList, setUserList] = useState<Applicant[]>([]);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: ({
      recruitmentId,
      applicants,
    }: {
      recruitmentId: number;
      applicants: AttendanceStatus[];
    }) => updateAttendanceAPI(recruitmentId, { applicants }),
    onError: (error) => {
      console.warn('error', error);
    },
    onSettled: (_, __, { recruitmentId }) => {
      queryClient.invalidateQueries({
        queryKey: ['attendance', recruitmentId],
      });
    },
  });

  const updateAttendance = () => {
    const updatedUserList = userList.map(
      ({ applicantId, volunteerAttendance }) => ({
        applicantId,
        isAttended: volunteerAttendance,
      }),
    );
    mutate({
      recruitmentId: Number(id),
      applicants: updatedUserList,
    });
  };

  const toggleCheck = ({ target: { id } }: ChangeEvent) => {
    const updatedUserList = userList.map((user) =>
      user.applicantId.toString() === id
        ? { ...user, volunteerAttendance: !user.volunteerAttendance }
        : user,
    );

    setUserList(updatedUserList);
  };

  const toggleAllCheck = ({
    target: { checked },
  }: ChangeEvent<HTMLInputElement>) => {
    setUserList(
      userList.map((user) => ({ ...user, volunteerAttendance: checked })),
    );
  };

  const {
    data: { applicants },
  } = useSuspenseQuery(attendanceQueryOptions(Number(id)));

  const allChecked = userList.every(({ volunteerAttendance }) =>
    Boolean(volunteerAttendance),
  );

  useEffect(() => {
    setUserList(applicants);
  }, [applicants]);

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
                  onChange={toggleAllCheck}
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
        onClick={updateAttendance}
        disabled={isPending}
        opacity={isPending ? '0.5' : '1'}
      >
        {isPending ? <Spinner /> : '출석 완료'}
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
