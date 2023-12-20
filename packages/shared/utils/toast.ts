import { CreateToastFnReturn, UseToastOptions } from '@chakra-ui/react';

export const updateToast = ({
  toast,
  toastId,
  toastOptions,
}: {
  toast: CreateToastFnReturn;
  toastId: string;
  toastOptions: UseToastOptions;
}) => {
  const updateToastOptions = {
    ...toastOptions,
    id: toastId,
  };

  if (!toast.isActive(toastId)) {
    toast(updateToastOptions);
  } else {
    toast.update(toastId, updateToastOptions);
  }
};
