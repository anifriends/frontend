import { delay, http, HttpResponse } from 'msw';

export const handlers = [
  http.post('/volunteers/reviews', async () => {
    await delay(200);
    return HttpResponse.json(null, { status: 200 });
  }),
  http.patch('/volunteers/reviews/:id', async () => {
    await delay(200);
    return HttpResponse.json(null, { status: 200 });
  }),
  http.get('/volunteers/reviews/:id', async () => {
    await delay(200);
    return HttpResponse.json(
      {
        reviewId: 1,
        reviewContent: `정말 강아지들이 귀여워서 봉사할 맛이 났어요!\n유기견 입양 한다면 꼭 여기서 입양할 거에요!`,
        reviewImageUrls: [
          'https://source.unsplash.com/random/1',
          'https://source.unsplash.com/random/2',
          'https://source.unsplash.com/random/3',
        ],
      },
      { status: 200 },
    );
  }),
];
