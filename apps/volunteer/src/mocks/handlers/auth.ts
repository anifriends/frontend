import { delay, http, HttpResponse } from 'msw';

export const handlers = [
  http.post('/auth/volunteers/login', async () => {
    await delay(200);
    return HttpResponse.json(
      {
        accessToken: 'accessToken',
        userId: 1,
        role: 'role',
      },
      { status: 200 },
    );
  }),
  http.post('/volunteers/email', async () => {
    await delay(200);
    return HttpResponse.json(
      {
        isDuplicated: false,
      },
      { status: 200 },
    );
  }),
];
