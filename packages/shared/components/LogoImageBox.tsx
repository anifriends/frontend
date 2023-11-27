import { Center, Image } from '@chakra-ui/react';

import AnimalfriendsLogo from '../assets/image-anifriends-logo.png';

export default function LogoImageBox() {
  return (
    <Center w="100%" py={10}>
      <Image boxSize={160} borderRadius={100} src={AnimalfriendsLogo} />
    </Center>
  );
}
