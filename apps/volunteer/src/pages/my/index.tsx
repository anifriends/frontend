import { Box, Divider, Highlight } from '@chakra-ui/react';
import Label from 'shared/components/Label';
import ProfileInfo from 'shared/components/ProfileInfo';
import Tabs from 'shared/components/Tabs';

import MyReviewsTab from './_components/MyReviews';
import useFetchMyVolunteer from './_hooks/useFetchMyVolunteer';

export default function MyPage() {
  const { data } = useFetchMyVolunteer();

  return (
    <Box>
      <ProfileInfo
        infoImage={data.volunteerImageUrl}
        infoTitle={data.volunteerName}
        infoTexts={[data.volunteerEmail, data.volunteerPhoneNumber]}
      >
        <Label labelTitle={`${data.volunteerTemperature}℃`} />
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
          query={`${data.completedVolunteerCount}회`}
          styles={{ color: 'orange.400', fontWeight: 600 }}
        >
          {`김프롱 님께서는 봉사를 ${data.completedVolunteerCount}회 완료했어요!`}
        </Highlight>
      </Box>
      <Tabs
        tabs={[
          ['신청한 봉사 목록', <Box key={1} minH={500} />],
          ['작성한 봉사 후기', <MyReviewsTab key={2} />],
        ]}
      />
    </Box>
  );
}
