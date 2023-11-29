import { delay, http, HttpResponse } from 'msw';

const DUMMY_REVIEWS_DATA = {
  reviewId: 36,
  shelterName: '남양주 보호소',
  reviewCreatedAt: '2023-03-16T18:00',
  reviewContent: '아이들이 너무 귀여워서 봉사하는 시간이 즐거웠습니다~!',
  reviewImageUrls: [
    'https://source.unsplash.com/random',
    'https://source.unsplash.com/random',
    'https://source.unsplash.com/random',
  ],
};

const DUMMY_RECRUITMENTS = {
  recruitmentId: 1,
  recruitmentTitle: '봉사자를 모집합니다',
  recruitmentStartTime: '2023-03-16T18:00:00',
  shelterName: '마석 보호소',
};

export const handlers = [
  http.get('/shelters/volunteers/:volunteerId/profile', async () => {
    await delay(200);
    return HttpResponse.json(
      {
        volunteerEmail: 'test@naver.com',
        volunteerName: '홍길동',
        volunteerTemperature: 36,
        volunteerImageUrl: 'https://source.unsplash.com/random',
        volunteerPhoneNumber: '010-8237-1847',
      },
      { status: 200 },
    );
  }),
  http.get('/shelters/volunteers/:volunteerId/reviews', async () => {
    await delay(2000);
    return HttpResponse.json(
      {
        pageInfo: {
          totalElements: 20,
          hasNext: true,
        },
        reviews: Array.from({ length: 10 }, () => DUMMY_REVIEWS_DATA),
      },
      { status: 200 },
    );
  }),
  http.get(
    '/shelters/volunteers/:volunteerId/recruitments/completed',
    async () => {
      await delay(2000);
      return HttpResponse.json({
        pageInfo: {
          totalElements: 20,
          hasNext: true,
        },
        recruitments: Array.from({ length: 10 }, () => DUMMY_RECRUITMENTS),
      });
    },
  ),
];
