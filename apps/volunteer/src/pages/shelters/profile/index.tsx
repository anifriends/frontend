import { Box, Divider } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import InfoTextList from 'shared/components/InfoTextList';
import ProfileInfo from 'shared/components/ProfileInfo';
import Tabs from 'shared/components/Tabs';

import { getShelterProfileDetail } from '@/apis/shelter';

import ShelterRecruitments from './_components/ShelterRecruitments';
import ShelterReviews from './_components/ShelterReviews';

export default function SheltersProfilePage() {
  const { id } = useParams();
  const shelterId = Number(id);

  const { data } = useQuery({
    queryKey: ['shelter', 'profile', shelterId],
    queryFn: async () => (await getShelterProfileDetail(shelterId)).data,
  });

  return (
    <Box>
      <ProfileInfo
        infoImage={data?.shelterImageUrl}
        infoTitle={data?.shelterName ?? ''}
        infoTexts={[data?.shelterEmail ?? '', data?.shelterAddress ?? '']}
      />
      <Divider />
      <InfoTextList
        infoTextItems={[
          { title: '전화번호', content: data?.shelterPhoneNumber ?? '' },
          {
            title: '전화번호(임시)',
            content: data?.shelterSparePhoneNumber ?? '',
          },
          {
            title: '상세주소',
            content: data?.shelterAddressDetail ?? '비공개',
          },
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
