import IoIosCamera from '@anifriends/assets/icon_IoCamera.svg';
import { Box, Flex, HStack, Image, Input, Text } from '@chakra-ui/react';
import type { ChangeEvent } from 'react';

import { EditPhotoItem } from '.';

export type Photo = {
  id: string;
  url: string;
};

type EditPhotoListProps = {
  photos: Photo[];
  uploadLimit?: number;
  onUploadPhoto: (files: FileList | null) => void;
  onDeletePhoto: (photoIndex: number) => void;
};

type UploadPhotoItemProps = {
  photoCount: number;
  uploadLimit: number;
  onUploadPhoto: (event: ChangeEvent<HTMLInputElement>) => void;
};

export function EditPhotoList({
  photos,
  uploadLimit = 5,
  onUploadPhoto,
  onDeletePhoto,
}: EditPhotoListProps) {
  const handleDeletePhoto = (photoIndex: number) => {
    onDeletePhoto(photoIndex);
  };

  const handleUploadPhoto = async (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    onUploadPhoto(files);
    event.target.value = '';
  };

  return (
    <HStack
      spacing={2}
      overflowX="scroll"
      sx={{
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      <UploadPhotoButton
        photoCount={photos.length}
        uploadLimit={uploadLimit}
        onUploadPhoto={handleUploadPhoto}
      />
      {photos.map(({ id, url }, index) => (
        <EditPhotoItem
          key={id}
          photoSrc={url}
          onDeletePhoto={() => handleDeletePhoto(index)}
        />
      ))}
    </HStack>
  );
}

function UploadPhotoButton({
  photoCount,
  uploadLimit,
  onUploadPhoto,
}: UploadPhotoItemProps) {
  return (
    <Box as="label">
      <Input
        display="none"
        type="file"
        accept="image/*"
        multiple
        onChange={onUploadPhoto}
      />
      <Flex
        boxSize={100}
        align="center"
        justify="center"
        border="1px solid"
        borderColor="gray.200"
        borderRadius="10px"
        backgroundColor="inherit"
        flexShrink={0}
      >
        <Flex flexDir="column" color="gray.400" justify="center">
          <Image src={IoIosCamera} />
          <Text display="flex" justifyContent="space-evenly" fontSize="14px">
            <Text
              as="span"
              color={photoCount === 0 ? 'gray.400' : 'orange.400'}
            >
              {photoCount}
            </Text>
            <Text as="span">/</Text>
            <Text as="span">{uploadLimit}</Text>
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
}
