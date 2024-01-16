import BiX from '@anifriends/assets/icon_BiX.svg';
import NoImage from '@anifriends/assets/icon_no_image.svg';
import type { ImageProps } from '@chakra-ui/react';
import { Box, Image } from '@chakra-ui/react';

type UploadedPhotoItemProps = {
  photoSrc: ImageProps['src'];
  onDeletePhoto: VoidFunction;
};

export function EditPhotoItem({
  photoSrc,
  onDeletePhoto,
}: UploadedPhotoItemProps) {
  return (
    <Box
      boxSize={100}
      pos="relative"
      overflow="hidden"
      borderRadius="10px"
      flexShrink={0}
    >
      <Box
        w={5}
        h={5}
        pos="absolute"
        top={1}
        right={1}
        borderRadius={50}
        border="1px solid"
        borderColor="orange.400"
        backgroundColor="white"
        cursor="pointer"
        onClick={onDeletePhoto}
      >
        <Image src={BiX} />
      </Box>
      <Image boxSize={100} fit="cover" src={photoSrc} fallbackSrc={NoImage} />
    </Box>
  );
}
