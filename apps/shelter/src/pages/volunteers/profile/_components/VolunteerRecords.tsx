import { Box, Card, CardBody, Heading, Text } from '@chakra-ui/react';
import { createFormattedTime } from 'shared/utils/date';

type VolunteerRecordItemProps = {
  recruitmentTitle: string;
  recruitmentStartTime: string;
  shelterName: string;
};

const DUMMY_RECRUITMENTS = {
  recruitmentId: 1,
  recruitmentTitle: '봉사자를 모집합니다',
  recruitmentStartTime: '2023-03-16T18:00:00',
  shelterName: '마석 보호소',
};

const DUMMY_DATA = {
  pageInfo: {
    totalElements: 200,
    hasNext: true,
  },
  recruitments: Array.from({ length: 8 }, () => DUMMY_RECRUITMENTS),
};

export default function VolunteerRecords() {
  return (
    <Box>
      <Heading fontWeight={600} fontSize="md" py={4}>
        봉사 이력 {DUMMY_DATA.recruitments.length}개
      </Heading>
      {DUMMY_DATA.recruitments.map((recruitment, index) => (
        <VolunteerRecordItem key={index} {...recruitment} />
      ))}
    </Box>
  );
}

function VolunteerRecordItem({
  shelterName,
  recruitmentTitle,
  recruitmentStartTime,
}: VolunteerRecordItemProps) {
  return (
    <Card p={4} pb={3.5} mb={2}>
      <CardBody pos="relative" p={0}>
        <Text pb={2} fontWeight={600}>
          {recruitmentTitle}
        </Text>
        <Text fontSize="sm" color="gray.400">
          {shelterName}
        </Text>
        <Text fontSize="sm" color="black">
          {`봉사일 | ${createFormattedTime(new Date(recruitmentStartTime))}`}
        </Text>
      </CardBody>
    </Card>
  );
}
