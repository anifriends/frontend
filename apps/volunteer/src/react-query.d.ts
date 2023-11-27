import '@tanstack/react-query';

import { AxiosError } from 'axios';
import { ErrorResponseData } from 'shared/types/apis/error';

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: AxiosError<ErrorResponseData>;
  }
}
