import { Box, useToken } from '@chakra-ui/react';
import Label from 'shared/components/Label';
import ProfileInfo from 'shared/components/ProfileInfo';
import Tabs from 'shared/components/Tabs';

import VolunteerRecords from './_components/VolunteerRecords';
import VolunteerReviews from './_components/VolunteerReviews';

const DUMMY_DATA = {
  volunteerEmail: 'test@naver.com',
  volunteerName: '김철수',
  volunteerTemperate: 36,
  volunteerImageUrl: 'www.aws.s3.com/asfqwe',
  volunteerPhoneNumber: '010-8237-1847',
};

export default function VolunteersProfilePage() {
  const [gray200] = useToken('colors', ['gray.200']);

  return (
    <Box h="100%">
      <Box borderBottom={`1px solid ${gray200}`}>
        <ProfileInfo
          infoTitle={DUMMY_DATA.volunteerName}
          infoImage={DUMMY_DATA.volunteerImageUrl}
          infoTexts={[
            DUMMY_DATA.volunteerEmail,
            DUMMY_DATA.volunteerPhoneNumber,
          ]}
        >
          <Label labelTitle={Number(DUMMY_DATA.volunteerTemperate) + '°C'} />
        </ProfileInfo>
      </Box>
      <Tabs
        tabs={[
          ['봉사 후기', <VolunteerReviews key={1} />],
          ['봉사 이력', <VolunteerRecords key={2} />],
        ]}
      />
    </Box>
  );
}
