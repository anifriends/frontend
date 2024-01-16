import Resizer from 'react-image-file-resizer';

const resize = (imageFile: File): Promise<File> => {
  return new Promise((resolve) => {
    Resizer.imageFileResizer(
      imageFile,
      1000,
      1000,
      'WEBP',
      100,
      0,
      (uri) => resolve(uri as File),
      'file',
    );
  });
};

export const resizeImageFile = async (
  imageFile: File,
  maxSizeMB: number,
): Promise<File> => {
  if (imageFile.size <= maxSizeMB * 1024 ** 2) {
    return imageFile;
  }

  const resizedImageFile = await resize(imageFile);
  return resizeImageFile(resizedImageFile, maxSizeMB);
};
