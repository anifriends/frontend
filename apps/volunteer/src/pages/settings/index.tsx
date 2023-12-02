import { Box, useToast, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import SettingGroup from 'shared/components/SettingGroup';
import APP_TYPE from 'shared/constants/appType';
import useAuthStore from 'shared/store/authStore';
import { removeItemFromStorage } from 'shared/utils/localStorage';

export default function SettingsPage() {
  const navigate = useNavigate();
  const goSettingsAccount = () => navigate('/settings/account');
  const goSettingsPassword = () => navigate('/settings/password');
  const { setUser } = useAuthStore();
  const toast = useToast();
  const logout = () => {
    setUser(null);
    removeItemFromStorage(APP_TYPE.VOLUNTEER_APP);
    navigate('/volunteers');
    toast({
      position: 'top',
      description: '로그아웃 되었습니다.',
      status: 'success',
      duration: 1500,
    });
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
