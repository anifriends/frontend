import { Box, IconButton, Image } from '@chakra-ui/react';

type UploadedPhotoItemProps = {
  photoUrl: string;
  onDeletePhoto: VoidFunction;
};

export default function UploadedPhotoItem({
  photoUrl,
  onDeletePhoto,
}: UploadedPhotoItemProps) {
  return (
    <Box pos="relative" boxSize={6.25} borderRadius="10px">
      <IconButton
        aria-label="delete-photo"
        pos="absolute"
        top={4}
        right={4}
        onClick={onDeletePhoto}
      />
      <Image overflow="inherit" src={photoUrl} />
    </Box>
  );
}
