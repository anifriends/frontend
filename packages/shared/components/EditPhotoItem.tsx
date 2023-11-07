import type { ImageProps } from '@chakra-ui/react';
import { Box, Image } from '@chakra-ui/react';
import { MouseEvent } from 'react';

import BiX from '../assets/icon_BiX.svg';

type UploadedPhotoItemProps = {
  photoId: ImageProps['id'];
  photoSrc: ImageProps['src'];
  onDeletePhoto: (event: MouseEvent<HTMLDivElement>) => void;
};

export default function EditPhotoItem({
  photoId,
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
        id={photoId}
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
      <Image boxSize={100} fit="cover" src={photoSrc} />
    </Box>
  );
}
