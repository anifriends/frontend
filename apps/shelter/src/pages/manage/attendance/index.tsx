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
  VStack,
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

const attendanceQueryOptions = (recruitmentId: number) =>
  queryOptions({
    queryKey: ['attendance', recruitmentId],
    queryFn: () => getShelterApprovedRecruitmentApplicants(recruitmentId),
    select: ({ data }) => data,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });

function ManageAttendance() {
  const { id } = useParams<{ id: string }>();
  const [userList, setUserList] = useState<Applicant[]>([]);
  const queryClient = useQueryClient();
  const {
    data: { applicants },
  } = useSuspenseQuery(attendanceQueryOptions(Number(id)));
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
        queryKey: attendanceQueryOptions(Number(recruitmentId)).queryKey,
      });
    },
  });

  const updateAttendance = () => {
    if (isPending) {
      return;
    }

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
    if (isPending) {
      return;
    }

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
    if (isPending) {
      return;
    }

    setUserList(
      userList.map((user) => ({ ...user, volunteerAttendance: checked })),
    );
  };

  const allChecked = userList.every(({ volunteerAttendance }) =>
    Boolean(volunteerAttendance),
  );

  useEffect(() => {
    setUserList(applicants);
  }, [applicants]);

  return (
    <Flex dir="column" justify="center" pb="56px">
      <TableContainer
        w="full"
        sx={{
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        <Table size="sm">
          <Thead bgColor="gray.100" color="gray.500">
            <Tr>
              <Th textAlign="center" py={2}>
                <Checkbox
                  colorScheme="orange"
                  borderColor="orange.400"
                  isChecked={allChecked}
                  onChange={toggleAllCheck}
                />
              </Th>
              {['이름', '성별', '생년월일', '전화번호'].map((th, index) => (
                <Th key={index} textAlign="center" fontWeight="normal" py={2}>
                  {th}
                </Th>
              ))}
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
                <Tr fontSize="sm" key={volunteerId}>
                  <Td py={4} textAlign="center">
                    <Checkbox
                      colorScheme="orange"
                      borderColor="orange.400"
                      isChecked={volunteerAttendance}
                      onChange={toggleCheck}
                      id={applicantId.toString()}
                    />
                  </Td>
                  <Td py={4} textAlign="center" fontWeight="semibold">
                    {volunteerName}
                  </Td>
                  <Td py={4} textAlign="center">
                    {volunteerGender === 'FEMALE' ? '여성' : '남성'}
                  </Td>
                  <Td py={4} textAlign="center">
                    {volunteerBirthDate.split('-').join('.')}
                  </Td>
                  <Td py={4} textAlign="center">
                    {volunteerPhoneNumber.split('-').join('')}
                  </Td>
                </Tr>
              ),
            )}
          </Tbody>
        </Table>
      </TableContainer>
      <VStack
        bgColor="white"
        mx="auto"
        maxW="container.sm"
        px={4}
        py={2}
        pos="fixed"
        bottom={0}
        left={0}
        right={0}
        align="stretch"
        zIndex={10}
      >
        <Button
          bgColor="orange.400"
          color="white"
          borderRadius={10}
          _hover={{ bg: undefined }}
          _active={{ bg: undefined }}
          onClick={updateAttendance}
          disabled={isPending}
          isLoading={isPending}
        >
          출석 완료
        </Button>
      </VStack>
    </Flex>
  );
}

export default function ManageAttendancePage() {
  return (
    <Suspense fallback={<p>로딩 중...</p>}>
      <ManageAttendance />
    </Suspense>
  );
}
