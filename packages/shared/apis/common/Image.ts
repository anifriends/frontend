import axiosInstance from '../axiosInstance';

type uploadImageRequest = FormData;

type uploadImageResponse = {
  imageUrls: string[];
};

export const uploadImage = (request: FormData) =>
  axiosInstance.post<uploadImageResponse, uploadImageRequest>(
    '/images',
    request,
    { headers: { 'Content-Type': 'multipart/form-data' } },
  );
