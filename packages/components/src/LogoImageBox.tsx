import AnimalfriendsLogo from '@anifriends/assets/image-anifriends-logo.png';
import { Center, Image } from '@chakra-ui/react';

export function LogoImageBox() {
  return (
    <Center w="100%" py={10}>
      <Image boxSize={160} borderRadius={100} src={AnimalfriendsLogo} />
    </Center>
  );
}
