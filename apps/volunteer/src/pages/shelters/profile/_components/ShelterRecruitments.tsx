import { Box, Card, CardBody, Heading, Text } from '@chakra-ui/react';
import ApplicantStatus from 'shared/components/ApplicantStatus';
import InfoSubtext from 'shared/components/InfoSubtext';

const DUMMY_RECRUITITEM = {
  title: '봉사자를 모집합니다.',
  volunteerDay: '23.12.20',
  deadline: '23.12.10',
  applicant: 4,
  capacity: 10,
};

type RecruitmentProps = {
  title: string;
  volunteerDay: string;
  deadline: string;
  applicant: number;
  capacity: number;
};

function ShelterRecruitmentItem(recruitmentInfo: RecruitmentProps) {
  const { title, volunteerDay, deadline, applicant, capacity } =
    recruitmentInfo;
  return (
    <Card p={4} pb={3.5} mb={2}>
      <CardBody pos="relative" p={0}>
        <Text pb={2} fontWeight={600}>
          {title}
        </Text>
        <InfoSubtext title="봉사일" content={volunteerDay} />
        <InfoSubtext title="마감일" content={deadline} />
        <Box pos="absolute" right={0} bottom={0}>
          <ApplicantStatus numerator={applicant} denominator={capacity} />
        </Box>
      </CardBody>
    </Card>
  );
}

export default function ShelterRecruitments() {
  return (
    <Box>
      <Heading fontWeight={600} fontSize="md" py={4}>
        보호소의 봉사 모집글 12개
      </Heading>
      {Array.from({ length: 5 }, () => DUMMY_RECRUITITEM).map(
        (recruitmentInfo, index) => (
          <ShelterRecruitmentItem key={index} {...recruitmentInfo} />
        ),
      )}
    </Box>
  );
}
