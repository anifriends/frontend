import { setupWorker } from 'msw/browser';

import { handlers as authHandlers } from './handlers/auth';
import { handlers as imageHandlers } from './handlers/image';
import { handlers as recruitmentHandler } from './handlers/recruitment';
import { handlers as reviewHandler } from './handlers/review';
import { handlers as shelterHandler } from './handlers/shelter';
import { handlers as volunteerHandlers } from './handlers/volunteer';

export const worker = setupWorker(
  ...authHandlers,
  ...imageHandlers,
  ...recruitmentHandler,
  ...reviewHandler,
  ...shelterHandler,
  ...volunteerHandlers,
);
