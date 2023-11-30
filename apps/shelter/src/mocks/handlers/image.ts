import { delay, http, HttpResponse } from 'msw';

export const handlers = [
  http.post('/images', async () => {
    await delay(200);

    return HttpResponse.json(
      {
        imageUrls: ['https://source.unsplash.com/random'],
      },
      { status: 200 },
    );
  }),
];
