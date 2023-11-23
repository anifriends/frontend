import { setupWorker } from 'msw/browser';

import { handlers as authHandlers } from './handlers/auth';
import { handlers as recruitmentHandler } from './handlers/recruitment';
import { handlers as shelterHandler } from './handlers/shelter';

export const worker = setupWorker(
  ...authHandlers,
  ...recruitmentHandler,
  ...shelterHandler,
);
