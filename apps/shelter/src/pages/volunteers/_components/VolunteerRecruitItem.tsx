import { Box, Button, HStack, MenuItem, Text, VStack } from '@chakra-ui/react';
import { ReactNode } from 'react';
import ApplicantStatus from 'shared/components/ApplicantStatus';
import Label from 'shared/components/Label';
import LabelText from 'shared/components/LabelText';
import OptionMenu from 'shared/components/OptionMenu';

import RecruitDateText from './RecruitDateText';

type Recruitment = {
  id: number;
  title: string;
  isRecruitmentClosed: boolean;
  volunteerDate: string;
  volunteerTime: string;
  deadLineDate: string;
  deadLineTime: string;
  volunteerDateDday: number;
  applicantCount: number;
  recruitmentCapacity: number;
};

type RecruitItemProps = {
  recruitment: Recruitment;
  onClickItem: VoidFunction;
  onUpdateRecruitment: VoidFunction;
  onDeleteRecruitment: VoidFunction;
  onManageApplies: VoidFunction;
  onManageAttendances: VoidFunction;
  onCloseRecruitment: VoidFunction;
};

export default function VolunteerRecruitItem({
  recruitment,
  onClickItem,
  onUpdateRecruitment,
  onDeleteRecruitment,
  onManageApplies,
  onManageAttendances,
  onCloseRecruitment,
}: RecruitItemProps) {
  const {
    title,
    isRecruitmentClosed,
    volunteerDate,
    volunteerTime,
    deadLineDate,
    deadLineTime,
    volunteerDateDday,
    applicantCount,
    recruitmentCapacity,
  } = recruitment;

  return (
    <Box
      py={3.5}
      px={4}
      pos="relative"
      borderBottom="1px"
      borderColor="gray.200"
    >
      <VStack spacing={18} align="stretch">
        <VStack
          spacing={2}
          align="stretch"
          position="relative"
          onClick={onClickItem}
        >
          {isRecruitmentClosed || volunteerDateDday < 0 ? (
            <Label type="GRAY" labelTitle="마감완료" />
          ) : (
            <LabelText
              type="GREEN"
              content={`D-${
                volunteerDateDday === 0 ? 'Day' : volunteerDateDday
              }`}
              labelTitle="모집중"
            />
          )}
          <Text fontWeight="bold" lineHeight="base">
            {title}
          </Text>
          <Box>
            <RecruitDateText
              title="봉사일시"
              date={volunteerDate}
              time={volunteerTime}
            />
            <RecruitDateText
              title="마감일시"
              date={deadLineDate}
              time={deadLineTime}
            />
          </Box>
          <Box pos="absolute" right={0} bottom={0}>
            <ApplicantStatus
              numerator={applicantCount}
              denominator={recruitmentCapacity}
            />
          </Box>
        </VStack>
        {isRecruitmentClosed ? (
          <VolunteerRecruitItemButton
            type="PRIMARY"
            onClick={onManageAttendances}
          >
            출석 관리
          </VolunteerRecruitItemButton>
        ) : (
          <HStack justifyContent="space-between" spacing={5}>
            <VolunteerRecruitItemButton
              type="SECONDARY"
              onClick={onManageApplies}
            >
              신청현황
            </VolunteerRecruitItemButton>
            <VolunteerRecruitItemButton
              type="PRIMARY"
              onClick={onCloseRecruitment}
            >
              마감하기
            </VolunteerRecruitItemButton>
          </HStack>
        )}
      </VStack>
      <OptionMenu pos="absolute" w={5} h={5} top={4} right={4}>
        <MenuItem onClick={onUpdateRecruitment}>수정하기</MenuItem>
        <MenuItem onClick={onDeleteRecruitment}>삭제하기</MenuItem>
      </OptionMenu>
    </Box>
  );
}

type RecruitItemButtonProps = {
  type: 'PRIMARY' | 'SECONDARY';
  onClick: VoidFunction;
  children: ReactNode;
};

function VolunteerRecruitItemButton({
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
