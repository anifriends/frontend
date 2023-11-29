import { setupWorker } from 'msw/browser';

import { handlers as authHandlers } from './handlers/auth';
import { handlers as manageHandlers } from './handlers/manage';
import { handlers as recruitmentHandler } from './handlers/recruitment';
import { handlers as recruitmentDetailHandler } from './handlers/recruitmentDetail';
import { handlers as shelterHandlers } from './handlers/shelter';
import { handlers as volunteerHandlers } from './handlers/volunteers';

export const worker = setupWorker(
  ...authHandlers,
  ...shelterHandlers,
  ...recruitmentHandler,
  ...recruitmentDetailHandler,
  ...manageHandlers,
  ...volunteerHandlers,
);
