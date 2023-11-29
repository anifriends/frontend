import { useToast, UseToastOptions } from '@chakra-ui/react';
import { useState } from 'react';

import { uploadImage } from '../apis/common/Image';
import { Photo } from '../components/EditPhotoList';

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

const getLocalImageUrls = (imageFiles: ImageFile[]): Promise<Photo[]> => {
  const getLocalImageUrl = imageFiles.map(({ id, image }) => {
    const reader = new FileReader();

    return new Promise<Photo>((resolve) => {
      reader.onloadend = () => {
        const imageFileUrl = String(reader.result);
        resolve({ id, url: imageFileUrl });
      };
      reader.readAsDataURL(image as File);
    });
  });

  return Promise.all(getLocalImageUrl);
};

const getServerImageUrls = (imageFiles: ImageFile[]) => {
  const uploadPromises = imageFiles.map(async ({ id, image }) => {
    try {
      const formData = new FormData();
      formData.append('images', image);

      const { data } = await uploadImage(formData);
      const [imageUrl] = data.imageUrls;

      return new Promise<Photo>((resolve) => {
        resolve({ id, url: imageUrl });
      });
    } catch (error) {
      return new Promise<Photo>((resolve) => {
        resolve({ id, url: 'upload-failed' });
      });
    }
  });

  return Promise.all(uploadPromises);
};

export const useUploadPhoto = (uploadLimit: number) => {
  const [photos, setPhotos] = useState<Photo[]>([]);

  const toast = useToast();

  const handleUploadPhoto = (files: FileList | null) => {
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

    getLocalImageUrls(imageFiles).then((newPhotos) => {
      setPhotos((prevPhotos) => [...newPhotos, ...prevPhotos]);
    });

    getServerImageUrls(imageFiles).then((newPhotos) => {
      newPhotos.forEach((newPhoto) => {
        setPhotos((prevPhotos) =>
          prevPhotos.map((photo) =>
            photo.id === newPhoto.id ? newPhoto : photo,
          ),
        );
      });
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
