import { Box, useToken } from '@chakra-ui/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import Label from 'shared/components/Label';
import ProfileInfo from 'shared/components/ProfileInfo';
import Tabs from 'shared/components/Tabs';

import { getVolunteerProfile } from '@/apis/volunteers';

import VolunteerRecruitments from './_components/VolunteerRecruitments';
import VolunteerReviews from './_components/VolunteerReviews';

export default function VolunteersProfilePage() {
  const { id } = useParams<{ id: string }>();
  const [gray200] = useToken('colors', ['gray.200']);

  const {
    data: {
      volunteerEmail,
      volunteerImageUrl,
      volunteerName,
      volunteerPhoneNumber,
      volunteerTemperature,
    },
  } = useSuspenseQuery({
    queryKey: ['volunteer', 'profile', id],
    queryFn: () => getVolunteerProfile(Number(id)),
    select: (data) => {
      return { ...data.data };
    },
  });

  return (
    <Box h="100%">
      <Box borderBottom={`1px solid ${gray200}`}>
        <ProfileInfo
          infoTitle={volunteerName}
          infoImage={volunteerImageUrl}
          infoTexts={[volunteerEmail, volunteerPhoneNumber]}
        >
          <Label labelTitle={Number(volunteerTemperature) + '°C'} />
        </ProfileInfo>
      </Box>
      <Tabs
        tabs={[
          ['봉사 후기', <VolunteerReviews id={Number(id)} key={1} />],
          ['봉사 이력', <VolunteerRecruitments id={Number(id)} key={2} />],
        ]}
      />
    </Box>
  );
}
