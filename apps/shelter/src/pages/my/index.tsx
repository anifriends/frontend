import { Box, Divider, Switch, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import InfoItem from 'shared/components/InfoItem';
import InfoList from 'shared/components/InfoList';
import InfoTextItem from 'shared/components/InfoTextItem';
import ProfileInfo from 'shared/components/ProfileInfo';
import SettingGroup from 'shared/components/SettingGroup';

import { useMyPage } from '@/pages/my/_hooks/useMyPage';

export default function MyPage() {
  const navigate = useNavigate();
  const { shelterProfile, isAddressPublic, updateAddressStatus } = useMyPage();

  const { shelterName, email, phoneNumber, sparePhoneNumber, shelterAddress } =
    shelterProfile;

  const goShelterReview = () => navigate('/mypage/reviews');
  const goSettingsAccount = () => navigate('/settings/account');
  const goSettingsPassword = () => navigate('/settings/password');
  const logout = () => {
    // TODO: 로그아웃
  };

  return (
    <Box>
      <ProfileInfo infoTitle={shelterName} infoTexts={[email]} />
      <Divider />
      <InfoList py={4}>
        <InfoTextItem title="전화번호" content={phoneNumber} />
        <InfoTextItem title="전화번호(임시)" content={sparePhoneNumber} />
        <InfoTextItem title="상세주소" content={shelterAddress} />
        <InfoItem title="상세주소 공개">
          <Switch
            size="sm"
            isChecked={isAddressPublic}
            onChange={updateAddressStatus}
          />
        </InfoItem>
      </InfoList>
      <VStack mt={8} spacing={8} align="stretch">
        <SettingGroup
          groupTitle="보호소 정보"
          settingItems={[
            { itemTitle: '보호소 후기 확인하기', onClick: goShelterReview },
          ]}
        />
        <SettingGroup
          groupTitle="설정"
          settingItems={[
            { itemTitle: '계정 정보 수정하기', onClick: goSettingsAccount },
            { itemTitle: '비밀번호 변경하기', onClick: goSettingsPassword },
          ]}
        />
        <SettingGroup
          groupTitle="기타"
          settingItems={[{ itemTitle: '로그아웃', onClick: logout }]}
        />
      </VStack>
    </Box>
  );
}
