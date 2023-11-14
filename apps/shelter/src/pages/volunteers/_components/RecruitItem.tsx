import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
  VStack,
} from '@chakra-ui/react';
import MenuIcon from 'shared/assets/icon_menu.svg';
import ApplicantStatus from 'shared/components/ApplicantStatus';
import Label from 'shared/components/Label';
import LabelText from 'shared/components/LabelText';

import { getDDay, getFullDate, getTime } from '../util';
import RecruitDateText from './RecruitDateText';

type Recruitment = {
  recruitmentId: number;
  recruitmentTitle: string;
  recruitmentStartTime: string;
  recruitmentEndTime: string;
  recruitmentDeadline: string;
  recruitmentIsClosed: boolean;
  recruitmentApplicantCount: number;
  recruitmentCapacity: number;
};

type RecruitItemProps = {
  showMenuButton?: boolean;
  onUpdate?: VoidFunction;
  onDelete?: VoidFunction;
  onClickManageApplyButton: VoidFunction;
  onClickManageAttendanceButton: VoidFunction;
  onClickCloseRecruitButton: VoidFunction;
} & Recruitment;

export default function RecruitItem({
  showMenuButton = true,
  onUpdate = () => {},
  onDelete = () => {},
  recruitmentId,
  recruitmentTitle,
  recruitmentStartTime,
  recruitmentEndTime,
  recruitmentDeadline,
  recruitmentIsClosed,
  recruitmentApplicantCount,
  recruitmentCapacity,
  onClickCloseRecruitButton,
  onClickManageApplyButton,
  onClickManageAttendanceButton,
}: RecruitItemProps) {
  return (
    <Box
      py={3.5}
      px={4}
      pos="relative"
      borderBottom="1px"
      borderColor="gray.200"
      key={recruitmentId}
    >
      <VStack spacing="1.5rem" align="stretch">
        <VStack spacing={2} align="stretch">
          {recruitmentIsClosed ? (
            <Label type="GRAY" labelTitle="마감완료" />
          ) : (
            <LabelText
              content={`D-${getDDay(recruitmentDeadline)}`}
              labelTitle="모집중"
            />
          )}
          <Text fontWeight="bold" lineHeight="base">
            {recruitmentTitle}
          </Text>
          <Box>
            <RecruitDateText
              title="봉사일시"
              date={`${getFullDate(recruitmentStartTime)}`}
              time={`${getTime(recruitmentStartTime)}~${getTime(
                recruitmentEndTime,
              )}`}
            />
            <Flex minWidth="max-content" alignItems="center">
              <RecruitDateText
                title="마감일시"
                date={`${getFullDate(recruitmentDeadline)}`}
                time={`${getTime(recruitmentDeadline)}`}
              />
              <Spacer />
              <ApplicantStatus
                numerator={recruitmentApplicantCount}
                denominator={recruitmentCapacity}
              />
            </Flex>
          </Box>
        </VStack>
        {recruitmentIsClosed ? (
          <AttendanceManagementButton
            onClickManageAttendanceButton={onClickManageAttendanceButton}
          />
        ) : (
          <RecruitingButtons
            onClickCloseRecruitButton={onClickCloseRecruitButton}
            onClickManageApplyButton={onClickManageApplyButton}
          />
        )}
      </VStack>
      {showMenuButton && <CustomMenu onUpdate={onUpdate} onDelete={onDelete} />}
    </Box>
  );
}

function RecruitingButtons({
  onClickManageApplyButton,
  onClickCloseRecruitButton,
}: Pick<
  RecruitItemProps,
  'onClickCloseRecruitButton' | 'onClickManageApplyButton'
>) {
  return (
    <HStack align="stretch" justifyContent="space-between" spacing={5}>
      <Button
        border="1px"
        borderRadius="0.625rem"
        px={14}
        py={1.5}
        color="orange.400"
        bgColor="transparent"
        _hover={{
          bg: undefined,
        }}
        _active={{
          bg: undefined,
        }}
        fontSize="sm"
        lineHeight={5}
        onClick={onClickManageApplyButton}
      >
        신청현황
      </Button>
      <Button
        border="1px"
        borderRadius="0.625rem"
        color="white"
        bgColor="orange.400"
        px={14}
        py={1.5}
        _hover={{
          bg: undefined,
        }}
        _active={{
          bg: undefined,
        }}
        onClick={onClickCloseRecruitButton}
      >
        마감하기
      </Button>
    </HStack>
  );
}

function AttendanceManagementButton({
  onClickManageAttendanceButton,
}: Pick<RecruitItemProps, 'onClickManageAttendanceButton'>) {
  return (
    <Button
      border="1px"
      borderRadius="0.625rem"
      px={14}
      py={1.5}
      color="white"
      bgColor="orange.400"
      _hover={{
        bg: undefined,
      }}
      _active={{
        bg: undefined,
      }}
      fontSize="sm"
      lineHeight={5}
      onClick={onClickManageAttendanceButton}
    >
      출석 관리
    </Button>
  );
}

function CustomMenu({
  onUpdate,
  onDelete,
}: {
  onUpdate: VoidFunction;
  onDelete: VoidFunction;
}) {
  return (
    <Menu placement="bottom-end" autoSelect={false}>
      <MenuButton
        minW={5}
        w={5}
        h={5}
        p={0}
        bgColor="transparent"
        color="gray.500"
        pos="absolute"
        top={4}
        right={4}
      >
        <Image src={MenuIcon} alt="menu icon" w="full" h="full" />
      </MenuButton>
      <MenuList minW="8rem">
        <MenuItem onClick={onUpdate}>수정하기</MenuItem>
        <MenuItem onClick={onDelete}>삭제하기</MenuItem>
        <MenuItem> 닫기</MenuItem>
      </MenuList>
    </Menu>
  );
}
