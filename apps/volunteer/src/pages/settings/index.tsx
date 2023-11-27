import { Box, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import SettingGroup from 'shared/components/SettingGroup';

export default function SettingsPage() {
  const navigate = useNavigate();
  const goSettingsAccount = () => navigate('/settings/account');
  const goSettingsPassword = () => navigate('/settings/password');
  const logout = () => {
    // TODO: 로그아웃
  };

  return (
    <Box>
      <VStack mt={8} spacing={8} align="stretch">
        <SettingGroup
          groupTitle="개인정보"
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
