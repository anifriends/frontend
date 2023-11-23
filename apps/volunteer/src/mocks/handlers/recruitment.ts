import { delay, http, HttpResponse } from 'msw';

const DUMMY_RECRUITMENT = {
  recruitmentId: 1,
  recruitmentTitle: '봉사자 모집합니다!!',
  recruitmentStartTime: '2021-11-08T11:44:30.327959',
  recruitmentEndTime: '2021-11-08T11:44:30.327959',
  recruitmentIsClosed: true,
  recruitmentApplicantCount: 2,
  recruitmentCapacity: 6,
  shelterId: 1,
  shelterName: '양천구 보건소',
  shelterImageUrl: 'https://source.unsplash.com/random',
};

const DUMMY_RECRUITMENT_LIST = Array.from(
  { length: 4 },
  () => DUMMY_RECRUITMENT,
);

export const handlers = [
  http.get('/recruitments', async () => {
    await delay(1000);
    return HttpResponse.json(
      {
        pageInfo: {
          totalElements: 100,
          hasNext: true,
        },
        recruitments: DUMMY_RECRUITMENT_LIST,
      },
      { status: 200 },
    );
  }),
  http.get('/recruitments/:id', async () => {
    await delay(200);
    return HttpResponse.json(
      {
        recruitmentTitle: '강아지봉사자를 모집합니다.',
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
          'https://source.unsplash.com/random/?person',
          'https://source.unsplash.com/random/300X500',
        ],
        shelterId: 3,
      },
      { status: 200 },
    );
  }),
];
