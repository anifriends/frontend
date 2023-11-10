import { delay, http, HttpResponse } from 'msw';

export const handlers = [
  http.post('/auth/volunteers/login', async ({ request }) => {
    console.log('Captured a "POST /login" request');
    await delay(200);
    const info = await request.json();
    console.log('Logging in as "%s"', info);
    return HttpResponse.json(
      {
        accessToken: 'accessToken',
        userId: 1,
        role: 'role',
      },
      { status: 200 },
    );
  }),
  http.post('/volunteers/email', async ({ request }) => {
    console.log('Captured a "POST /volunteers/email" request');
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
