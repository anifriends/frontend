import { setupWorker } from 'msw/browser';

import { handlers } from './handlers/auth';
import { handlers as recruitmentHandler } from './handlers/recruitment';

export const worker = setupWorker(...handlers, ...recruitmentHandler);
