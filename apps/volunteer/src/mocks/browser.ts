import { setupWorker } from 'msw/browser';

import { handlers } from './handlers/auth';
import { handlers as volunteerHandlers } from './handlers/volunteer';

export const worker = setupWorker(...handlers, ...volunteerHandlers);
