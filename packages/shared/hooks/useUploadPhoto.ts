import { useToast, UseToastOptions } from '@chakra-ui/react';
import { useState } from 'react';

import { Photo } from '../components/EditPhotoList';

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

const getRandomId = (): string => {
  return String(Math.random()).slice(2);
};

export const useUploadPhoto = (uploadLimit: number) => {
  const [photos, setPhotos] = useState<Photo[]>([]);

  const toast = useToast();

  const handleUploadPhoto = (files: FileList | null) => {
    if (!files) {
      return;
    }

    if (photos.length >= uploadLimit) {
      toast(
        toastOption(
          `이미지는 최대 ${uploadLimit}개 까지 추가할 수 있어요.`,
          'error',
        ),
      );

      return;
    }

    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append(getRandomId(), file);
    });

    const localImagePromises: Promise<Photo>[] = [];

    for (const [key, file] of formData) {
      const reader = new FileReader();

      localImagePromises.push(
        new Promise<Photo>((resolve) => {
          reader.onloadend = () => {
            const imageFileUrl = String(reader.result);
            resolve({ id: key, url: imageFileUrl });
          };
        }),
      );

      reader.readAsDataURL(file as File);
    }

    Promise.all(localImagePromises).then((newPhotos) => {
      const prevPhotos = photos;

      setPhotos([...newPhotos, ...prevPhotos]);
    });
  };

  const handleDeletePhoto = (photoIndex: number) => {
    setPhotos((prevPhotos) =>
      prevPhotos.slice(0, photoIndex).concat(prevPhotos.slice(photoIndex + 1)),
    );
  };

  return {
    photos,
    handleUploadPhoto,
    handleDeletePhoto,
  };
};
