import { setupWorker } from 'msw/browser';

import { handlers as authHandlers } from './handlers/auth';
import { handlers as recruitmentHandler } from './handlers/recruitment';
import { handlers as reviewHandler } from './handlers/review';
import { handlers as shelterHandler } from './handlers/shelter';
import { handlers as volunteerHandlers } from './handlers/volunteer';

export const worker = setupWorker(
  ...authHandlers,
  ...recruitmentHandler,
  ...reviewHandler,
  ...shelterHandler,
  ...volunteerHandlers,
);
