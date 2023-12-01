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

function SheltersProfile() {
  const { id } = useParams<{ id: string }>();
  const shelterId = Number(id);

  const { data } = useSuspenseQuery({
    queryKey: ['shelter', 'profile', shelterId],
    queryFn: async () => (await getShelterProfileDetail(shelterId)).data,
  });

  return (
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
          [
            '봉사후기',
            <Suspense fallback={<p>봉사 후기 로징 중...</p>} key={1}>
              <ShelterReviewsTab key={1} />
            </Suspense>,
          ],
          [
            '봉사모집글',
            <Suspense fallback={<p>봉사 모집글 로딩 중...</p>} key={2}>
              <ShelterRecruitments key={2} />
            </Suspense>,
          ],
        ]}
      />
    </Box>
  );
}

export default function SheltersProfilePage() {
  return (
    <Suspense fallback={<p>보호소 프로필 페이지 로딩 중...</p>}>
      <SheltersProfile />
    </Suspense>
  );
}
