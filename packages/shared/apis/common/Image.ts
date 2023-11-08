import axiosInstance from 'apis/axiosInstance';

export const uploadImage = (images: File[]) =>
  axiosInstance.post<
    {
      imageUrls: string[];
    },
    {
      images: File[];
    }
  >('/images', { images });
