import { Box, Divider } from '@chakra-ui/react';
import InfoTextList from 'shared/components/InfoTextList';
import ProfileInfo from 'shared/components/ProfileInfo';
import Tabs from 'shared/components/Tabs';

import ShelterRecruitments from './_components/ShelterRecruitments';
import ShelterReviews from './_components/ShelterReviews';

export default function SheltersProfilePage() {
  return (
    <Box>
      <ProfileInfo
        infoTitle="양천구 보호소"
        infoTexts={['shelter@gmail.com', '비공개']}
      />
      <Divider />
      <InfoTextList
        infoTextItems={[
          { title: '전화번호', content: '010-1234-5678' },
          { title: '전화번호(임시)', content: '02-123-4567' },
          { title: '상세주소', content: '비공개' },
        ]}
      />
      <Tabs
        tabs={[
          ['봉사후기', <ShelterReviews key={1} />],
          ['봉사모집글', <ShelterRecruitments key={2} />],
        ]}
      />
    </Box>
  );
}
