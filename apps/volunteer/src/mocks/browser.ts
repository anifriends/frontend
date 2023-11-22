import { setupWorker } from 'msw/browser';

import { handlers as authHandlers } from './handlers/auth';
import { handlers as recruitmentHandler } from './handlers/recruitment';

export const worker = setupWorker(...authHandlers, ...recruitmentHandler);
