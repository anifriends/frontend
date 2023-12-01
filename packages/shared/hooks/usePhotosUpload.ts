import { useToast, UseToastOptions } from '@chakra-ui/react';
import { useState } from 'react';

import { uploadImage } from '../apis/common/Image';
import { Photo } from '../components/EditPhotoList';
import { resizeImageFile } from '../utils/image';

type ImageFile = { id: string; image: File };

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

const getLocalImageUrls = (imageFiles: ImageFile[]): Photo[] =>
  imageFiles.map(({ id, image }) => ({ id, url: URL.createObjectURL(image) }));

const getServerImageUrls = async (
  imageFiles: ImageFile[],
): Promise<Photo[]> => {
  const uploadPromises: Promise<Photo>[] = imageFiles.map(
    async ({ id, image }) => {
      try {
        const resizedImage = await resizeImageFile(image, 2);
        const formData = new FormData();
        formData.append('images', resizedImage);

        const { data } = await uploadImage(formData);
        const [imageUrl] = data.imageUrls;

        return { id, url: imageUrl };
      } catch (error) {
        return { id, url: 'upload-failed' };
      }
    },
  );

  return Promise.all(uploadPromises);
};

export const usePhotosUpload = (uploadLimit: number) => {
  const [photos, setPhotos] = useState<Photo[]>([]);

  const toast = useToast();

  const setImageUrls = (imageUrls: string[]) => {
    const newPhotos: Photo[] =
      imageUrls.map((url) => ({
        id: getRandomId(),
        url,
      })) || [];

    setPhotos(newPhotos);
  };

  const handleUploadPhoto = async (files: FileList | null) => {
    if (!files) {
      return;
    }

    if (photos.length + files.length > uploadLimit) {
      toast(
        toastOption(
          `이미지는 최대 ${uploadLimit}개 까지 추가할 수 있어요.`,
          'error',
        ),
      );

      return;
    }

    const imageFiles: ImageFile[] = Array.from(files).map((file) => ({
      id: getRandomId(),
      image: file,
    }));

    setPhotos((prevPhotos) => [
      ...getLocalImageUrls(imageFiles),
      ...prevPhotos,
    ]);

    const newPhotos: Photo[] = await getServerImageUrls(imageFiles);

    setPhotos((prevPhotos) =>
      prevPhotos.map((photo) => {
        const newPhoto = newPhotos.find(({ id }) => photo.id === id);
        return newPhoto ? newPhoto : photo;
      }),
    );
  };

  const handleDeletePhoto = (photoIndex: number) => {
    setPhotos((prevPhotos) =>
      prevPhotos.slice(0, photoIndex).concat(prevPhotos.slice(photoIndex + 1)),
    );
  };

  return {
    photos,
    setImageUrls,
    handleUploadPhoto,
    handleDeletePhoto,
  };
};
