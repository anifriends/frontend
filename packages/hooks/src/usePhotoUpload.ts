import { uploadImage } from '@anifriends/apis';
import { resizeImageFile } from '@anifriends/utils';
import { useToast, UseToastOptions } from '@chakra-ui/react';
import { useState } from 'react';

const toastOption = (
  description: string,
  status: UseToastOptions['status'],
): UseToastOptions => {
  return {
    description,
    position: 'top',
    status,
    duration: 1500,
    isClosable: true,
  };
};

export const usePhotoUpload = (initialPhoto?: string) => {
  const [photo, setPhoto] = useState<string | undefined>(initialPhoto);

  const toast = useToast();

  const handleUploadPhoto = async (files: FileList | null) => {
    if (!files) {
      return;
    }

    if (files.length !== 1) {
      toast(toastOption('프로필 이미지는 한 장만 등록 가능합니다.', 'error'));

      return;
    }

    const imageFile = files[0];
    const localImageUrl = URL.createObjectURL(imageFile);
    setPhoto(localImageUrl);

    const resizedImage = await resizeImageFile(imageFile, 2);
    const formData = new FormData();
    formData.append('images', resizedImage);

    const { data } = await uploadImage(formData);
    const [imageUrl] = data.imageUrls;

    setPhoto(imageUrl);
  };

  const handleDeletePhoto = () => {
    setPhoto(undefined);
  };

  return {
    photo,
    setPhoto,
    handleUploadPhoto,
    handleDeletePhoto,
  };
};
