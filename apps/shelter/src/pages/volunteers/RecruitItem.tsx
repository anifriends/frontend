import {
  AspectRatio,
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
import InfoSubText from 'shared/components/InfoSubtext';
import LabelText from 'shared/components/LabelText';

import RecruitDateText from './RecruitDateText';

const DUMMY_IMAGE = 'https://source.unsplash.com/random';

export default function RecruitItem({
  showMenuButton = true,
  onUpdate = () => {},
  onDelete = () => {},
}) {
  return (
    <Box
      py={3.5}
      px={4}
      pos="relative"
      borderBottom="1px"
      borderColor="gray.200"
    >
      <VStack spacing="1.5rem" align="stretch">
        <VStack spacing={2} align="stretch">
          <LabelText content="D-12" labelTitle="모집중" />
          <Text fontWeight="bold" lineHeight="base">
            봉사자 모집합니다
          </Text>
          <Box>
            <RecruitDateText
              title="봉사일"
              date="2023.10.23"
              time="14:00~16:00"
            />
            <Flex minWidth="max-content" alignItems="center">
              <RecruitDateText title="마감일" date="2023.10.22" time="14:00" />
              <Spacer />
              <ApplicantStatus numerator={2} denominator={6} />
            </Flex>
          </Box>
        </VStack>
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
        {/* <HStack align="stretch" justifyContent="space-between" spacing={5}>
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
        </HStack> */}
      </VStack>
      {showMenuButton && <CustomMenu onUpdate={onUpdate} onDelete={onDelete} />}
    </Box>
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

export function VolunteerRecruitItem() {
  return (
    <Box p={4} borderBottom="1px" borderColor="gray.200">
      <HStack spacing={3} justifyContent="center">
        <AspectRatio minW="110px" ratio={1}>
          <Image src={DUMMY_IMAGE} borderRadius="0.625rem" />
        </AspectRatio>
        <VStack spacing={2.5} w="full">
          <Box w="full">
            <LabelText content="D-12" labelTitle="모집중" />
            <Text fontWeight="bold" lineHeight="base">
              봉사자 모집합니다!!
            </Text>
            <Text color="gray.400" fontSize="xs" lineHeight={4}>
              양천구 보건소
            </Text>
            <InfoSubText title="봉사일" content="23.10.23" />
          </Box>
          <Box alignSelf="flex-end" lineHeight="none">
            <ApplicantStatus numerator={2} denominator={6} />
          </Box>
        </VStack>
      </HStack>
    </Box>
  );
}
