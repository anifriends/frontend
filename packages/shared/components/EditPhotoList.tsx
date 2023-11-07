import type { UseToastOptions } from '@chakra-ui/react';
import {
  Box,
  Flex,
  HStack,
  Image,
  Input,
  Text,
  useToast,
} from '@chakra-ui/react';
import type { ChangeEvent, Dispatch, MouseEvent, SetStateAction } from 'react';

import IoIosCamera from '../assets/icon_IoCamera.svg';
import EditPhotoItem from './EditPhotoItem';

type EditPhotoListProps = {
  urls: string[];
  setUrls: Dispatch<SetStateAction<string[]>>;
};

type UploadPhotoItemProps = {
  urlsCount: number;
  onUploadPhoto: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function EditPhotoList({ urls, setUrls }: EditPhotoListProps) {
  const toast = useToast();

  const afterUploadToast = (
    description: string,
    status: UseToastOptions['status'],
  ) => {
    toast({
      description,
      position: 'top',
      status,
      duration: 1500,
      isClosable: true,
    });
  };

  const deletePhoto = (event: MouseEvent<HTMLDivElement>) => {
    const { id } = event.currentTarget;
    const newUrls = urls.filter((url) => url !== id);

    setUrls(newUrls);
  };

  const uploadPhoto = async (event: ChangeEvent<HTMLInputElement>) => {
    if (urls.length === 5) {
      afterUploadToast('사진을 더이상 추가할 수 없습니다', 'error');

      return;
    }

    const formData = new FormData();
    const { files } = event.currentTarget;
    const uploadPhotoCount = (files?.length ?? 0) + urls.length;

    if (uploadPhotoCount > 5) {
      afterUploadToast(`${5 - urls.length}개 더 등록이 가능합니다`, 'error');

      return;
    }

    if (files) {
      Array.from(files).forEach((file) => {
        formData.append('images', file);
      });
    }

    // 아래는 api 함수로 받아왔다는 이미지들을 url 형식들로 받아왔다는 가정하에 진행하는 로직입니다

    if (files) {
      const imageUrls = Array.from(files).map((file) =>
        URL.createObjectURL(file),
      );

      setUrls((prevUrls) => [...imageUrls, ...prevUrls]);
    }
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
      <UploadPhotoItem onUploadPhoto={uploadPhoto} urlsCount={urls.length} />
      {urls.map((url, index) => (
        <EditPhotoItem
          key={index}
          photoId={url}
          photoSrc={url}
          onDeletePhoto={deletePhoto}
        />
      ))}
    </HStack>
  );
}

function UploadPhotoItem({ urlsCount, onUploadPhoto }: UploadPhotoItemProps) {
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
            <Text as="span" color={urlsCount === 0 ? 'gray.400' : 'orange.400'}>
              {urlsCount}
            </Text>
            <Text as="span">/</Text>
            <Text as="span">5</Text>
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
}
