import { delay, http, HttpResponse } from 'msw';

export const handlers = [
  http.post('/auth/shelters/login', async ({ request }) => {
    console.log('Captured a "POST /auth/shelters/login" request');
    await delay(200);
    const info = await request.json();
    console.log('Logging in as "%s"', info);
    return HttpResponse.json(
      {
        accessToken: 'accessToken',
        userId: 1,
        role: 'shelter',
      },
      { status: 200 },
    );
  }),
  http.post('/shelters/email', async ({ request }) => {
    console.log('Captured a "POST /shelters/email" request');
    await delay(200);
    const info = await request.json();
    console.log('Logging in as "%s"', info);
    return HttpResponse.json(
      {
        isDuplicated: false,
      },
      { status: 200 },
    );
  }),
];
