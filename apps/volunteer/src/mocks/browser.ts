import { setupWorker } from 'msw/browser';

import { handlers } from './handler/auth';

export const worker = setupWorker(...handlers);
