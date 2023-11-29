import { delay, http, HttpResponse } from 'msw';

export const handlers = [
  http.post('/volunteers/reviews', async () => {
    await delay(200);
    return HttpResponse.json(null, { status: 200 });
  }),
  http.put('/volunteers/reviews/:id', async () => {
    await delay(200);
    return HttpResponse.json(null, { status: 200 });
  }),
];
