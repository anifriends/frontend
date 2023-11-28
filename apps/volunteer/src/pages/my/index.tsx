import { Box, Divider, Highlight } from '@chakra-ui/react';
import Label from 'shared/components/Label';
import ProfileInfo from 'shared/components/ProfileInfo';
import Tabs from 'shared/components/Tabs';

const DUMMY_VOLUNTEER = {
  volunteerId: 1,
  volunteerEmail: 'asdf@naver.com',
  volunteerName: '이름',
  volunteerBirthDate: '2023-03-16',
  volunteerPhoneNumber: '010-1234-5678',
  volunteerTemperature: 36,
  completedVolunteerCount: 3,
  volunteerImageUrl: 'imageUrl',
  volunteerGender: 'MALE',
};

export default function MyPage() {
  return (
    <Box>
      <ProfileInfo
        infoImage=""
        infoTitle="김프롱"
        infoTexts={['programmers@gmail.com', '010-1234-4567']}
      >
        <Label labelTitle="32℃" />
      </ProfileInfo>
      <Divider />
      <Box
        textAlign="center"
        fontWeight={500}
        border="1px solid"
        borderColor="gray.200"
        borderRadius={10}
        m={4}
        mb={25}
        py={3}
      >
        <Highlight
          query="3회"
          styles={{ color: 'orange.400', fontWeight: 600 }}
        >
          김프롱 님께서는 봉사를 3회 완료했어요!
        </Highlight>
      </Box>
      <Tabs
        tabs={[
          ['신청한 봉사 목록', <Box key={1} minH={500} />],
          ['작성한 봉사 후기', <Box key={2} minH={500} />],
        ]}
      />
    </Box>
  );
}
