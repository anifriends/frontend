import {
  ApplicantStatus,
  Label,
  LabelText,
  OptionMenu,
} from '@anifriends/components';
import { Box, HStack, MenuItem, Text, VStack } from '@chakra-ui/react';

import VolunteerRecruitItemButton from '@/pages/volunteers/_components/VolunteerRecruitItemButton';

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
  onClickItem: (id: number) => void;
  onUpdateRecruitment: (id: number) => void;
  onDeleteRecruitment: (id: number) => void;
  onManageApplies: (id: number) => void;
  onManageAttendances: (id: number) => void;
  onCloseRecruitment: (id: number) => void;
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
    id,
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
          onClick={() => onClickItem(id)}
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
            onClick={() => onManageAttendances(id)}
          >
            출석 관리
          </VolunteerRecruitItemButton>
        ) : (
          <HStack justifyContent="space-between" spacing={5}>
            <VolunteerRecruitItemButton
              type="SECONDARY"
              onClick={() => onManageApplies(id)}
            >
              신청현황
            </VolunteerRecruitItemButton>
            <VolunteerRecruitItemButton
              type="PRIMARY"
              onClick={() => onCloseRecruitment(id)}
            >
              마감하기
            </VolunteerRecruitItemButton>
          </HStack>
        )}
      </VStack>
      <OptionMenu pos="absolute" w={5} h={5} top={4} right={4}>
        <MenuItem onClick={() => onUpdateRecruitment(id)}>수정하기</MenuItem>
        <MenuItem onClick={() => onDeleteRecruitment(id)}>삭제하기</MenuItem>
      </OptionMenu>
    </Box>
  );
}
