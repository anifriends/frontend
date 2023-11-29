import { delay, http, HttpResponse } from 'msw';

const DUMMY_MYREVIEW = {
  reviewId: 32,
  shelterName: '해피퍼피',
  shelterId: 1,
  reviewCreatedAt: '2023-03-16T18:00',
  reviewContent: '시설이 너무 깨끗하고 강아지도...',
  reviewImageUrls: [
    'https://source.unsplash.com/random',
    'https://source.unsplash.com/random',
  ],
};

export const handlers = [
  http.get('/volunteers/me', async () => {
    await delay(200);
    return HttpResponse.json({
      volunteerId: 1,
      volunteerEmail: 'programmers@gmail.com',
      volunteerName: '김프롱',
      volunteerBirthDate: '2023-03-16',
      volunteerPhoneNumber: '010-1234-5678',
      volunteerTemperature: 32,
      completedVolunteerCount: 3,
      volunteerImageUrl: 'https://source.unsplash.com/random',
      volunteerGender: 'FEMALE',
    });
  }),
  http.patch('/volunteers/me', async ({ request }) => {
    const updateVolunteer = await request.json();
    console.log(updateVolunteer);
    return new HttpResponse(null, { status: 204 });
  }),
  http.get('/volunteers/me/reviews', async ({ request }) => {
    await delay(1000);
    const url = new URL(request.url);
    const page = url.searchParams.get('page');

    return HttpResponse.json(
      {
        pageInfo: {
          totalElements: 30,
          hasNext: page === '3' ? false : true,
        },
        reviews: Array.from({ length: 10 }, () => ({
          ...DUMMY_MYREVIEW,
          reviewId: Math.random(),
        })),
      },
      {
        status: 200,
      },
    );
  }),
];
