import { delay, http, HttpResponse } from 'msw';

export const handlers = [
  http.post('/auth/shelters/login', async () => {
    await delay(200);
    return HttpResponse.json(
      {
        accessToken: 'accessToken',
        userId: 1,
        role: 'shelter',
      },
      { status: 200 },
    );
  }),
  http.post('/shelters/email', async () => {
    await delay(200);
    return HttpResponse.json(
      {
        isDuplicated: false,
      },
      { status: 200 },
    );
  }),
];
