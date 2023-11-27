import { setupWorker } from 'msw/browser';

import { handlers as authHandlers } from './handlers/auth';
import { handlers as recruitmentHandler } from './handlers/recruitment';
import { handlers as volunteerHandlers } from './handlers/volunteer';

export const worker = setupWorker(...authHandlers, ...recruitmentHandler, ...volunteerHandlers );
