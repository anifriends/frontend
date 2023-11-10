import { setupWorker } from 'msw/browser';

import { handlers } from './handlers/auth';

export const worker = setupWorker(...handlers);
