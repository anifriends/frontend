import axiosInstance from '../axiosInstance';

export const uploadImage = (images: File[]) =>
  axiosInstance.post<
    {
      imageUrls: string[];
    },
    {
      images: File[];
    }
  >('/images', { images });
