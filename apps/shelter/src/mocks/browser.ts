import { setupWorker } from 'msw/browser';

import { handlers as authHandlers } from './handlers/auth';
import { handlers as shelterHandlers } from './handlers/shelter';

export const worker = setupWorker(...authHandlers, ...shelterHandlers);
