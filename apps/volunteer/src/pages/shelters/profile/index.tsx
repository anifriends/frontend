import { Box, Divider } from '@chakra-ui/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import InfoTextList from 'shared/components/InfoTextList';
import ProfileInfo from 'shared/components/ProfileInfo';
import Tabs from 'shared/components/Tabs';

import { getShelterProfileDetail } from '@/apis/shelter';

import ShelterRecruitments from './_components/ShelterRecruitments';
import ShelterReviewsTab from './_components/ShelterReviews';

export default function SheltersProfilePage() {
  const { id } = useParams<{ id: string }>();
  const shelterId = Number(id);

  const { data } = useSuspenseQuery({
    queryKey: ['shelter', 'profile', shelterId],
    queryFn: async () => (await getShelterProfileDetail(shelterId)).data,
  });

  return (
    <Suspense fallback={<p>보호소 프로필 정도 로딩 중...</p>}>
      <Box>
        <ProfileInfo
          infoImage={data.shelterImageUrl}
          infoTitle={data.shelterName}
          infoTexts={[data.shelterEmail, data.shelterAddress]}
        />
        <Divider />
        <InfoTextList
          infoTextItems={[
            { title: '전화번호', content: data.shelterPhoneNumber },
            {
              title: '전화번호(임시)',
              content: data.shelterSparePhoneNumber,
            },
            {
              title: '상세주소',
              content: data.shelterAddressDetail,
            },
          ]}
        />
        <Tabs
          tabs={[
            ['봉사후기', <ShelterReviewsTab key={1} />],
            ['봉사모집글', <ShelterRecruitments key={2} />],
          ]}
        />
      </Box>
    </Suspense>
  );
}
