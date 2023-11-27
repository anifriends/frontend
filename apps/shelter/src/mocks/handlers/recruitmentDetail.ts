import { delay, http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/recruitments/:id', async () => {
    await delay(200);
    return HttpResponse.json(
      {
        recruitmentTitle: '가짜 데이터 제목입니다.',
        recruitmentApplicantCount: 5,
        recruitmentCapacity: 10,
        recruitmentContent: '가짜 데이터 내용입니다!!! '.repeat(50),
        recruitmentStartTime: '2023-12-17T14:00:00',
        recruitmentEndTime: '2023-12-17T16:00:00',
        recruitmentIsClosed: false,
        recruitmentDeadline: '2023-12-18T18:00:00',
        recruitmentCreatedAt: '2023-12-15T14:00:00',
        recruitmentUpdatedAt: '2023-12-15T14:00:00',
        recruitmentImageUrls: [
          'https://source.unsplash.com/random/?animal',
          'https://source.unsplash.com/random/300X500',
        ],
      },
      { status: 200 },
    );
  }),
];
