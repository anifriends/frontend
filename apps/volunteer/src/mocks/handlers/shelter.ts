import { delay, http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/shelters/:shelterId/profile/simple', async () => {
    await delay(200);
    return HttpResponse.json(
      {
        shelterName: '양천구 보호소',
        shelterImageUrl: 'https://source.unsplash.com/random/?person',
        shelterAddress: '서울특별시 양천구',
        shelterEmail: 'shelter@gmail.com',
      },
      { status: 200 },
    );
  }),
];
