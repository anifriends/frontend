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
import LabelText from 'shared/components/LabelText';

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
          <LabelText
            content={recruitmentDeadline}
            labelTitle={recruitmentIsClosed ? '마감 완료' : '모집중'}
          />
          <Text fontWeight="bold" lineHeight="base">
            {recruitmentTitle}
          </Text>
          <Box>
            <RecruitDateText
              title="봉사일"
              date={`${recruitmentStartTime}`}
              time={`${recruitmentStartTime}~${recruitmentEndTime}`}
            />
            <Flex minWidth="max-content" alignItems="center">
              <RecruitDateText
                title="마감일"
                date={`${recruitmentDeadline}`}
                time={`${recruitmentDeadline}`}
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
          <AttendanceManagementButton />
        ) : (
          <RecruitingButtons />
        )}
      </VStack>
      {showMenuButton && <CustomMenu onUpdate={onUpdate} onDelete={onDelete} />}
    </Box>
  );
}

function RecruitingButtons() {
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
      >
        마감하기
      </Button>
    </HStack>
  );
}

function AttendanceManagementButton() {
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
