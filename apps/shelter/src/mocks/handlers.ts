import { delay, http, HttpResponse } from 'msw';

const ALL_POST = [
  {
    userId: 1,
    id: 1,
    title: '모킹 포스트 1',
    body: '모킹된 포스트에요. MSW를 이용했어요.',
  },
  {
    userId: 1,
    id: 2,
    title: '모킹 포스트 2',
    body: '모킹된 포스트에요. MSW를 이용했어요.',
  },
  {
    userId: 1,
    id: 3,
    title: '모킹 포스트 3',
    body: '모킹된 포스트에요. MSW를 이용했어요.',
  },
  {
    userId: 1,
    id: 4,
    title: '모킹 포스트 4',
    body: '모킹된 포스트에요. MSW를 이용했어요.',
  },
  {
    userId: 1,
    id: 5,
    title: '모킹 포스트 5',
    body: '모킹된 포스트에요. MSW를 이용했어요.',
  },
];

export const handlers = [
  http.get('/example/posts', async () => {
    await delay(200);
    return HttpResponse.json(ALL_POST);
  }),
];
