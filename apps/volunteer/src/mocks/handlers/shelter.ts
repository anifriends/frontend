import { delay, http, HttpResponse } from 'msw';

const DUMMY_SHELTERINFO = {
  shelterImageUrl: 'https://source.unsplash.com/random/?person',
  shelterName: '양천구 보호소',
  shelterEmail: 'shelter@email.com',
  shelterAddress: '서울특별시 양천구 ',
  shelterAddressDetail: '서울특별시 양천구 신월동 동자빌딩',
  shelterPhoneNumber: '010-1234-5678',
  shelterSparePhoneNumber: '02-345-6789',
};

const DUMMY_SHELTER_REVIEW = {
  reviewId: 32,
  volunteerEmail: 'bjo8291',
  volunteerTemperature: 44,
  reviewCreatedAt: '2023-03-16T18:00',
  reviewContent: '시설이 너무 깨끗하고 강아지도...',
  reviewImageUrls: [
    'https://source.unsplash.com/random/',
    'https://source.unsplash.com/random/',
    'https://source.unsplash.com/random/',
  ],
};

export const handlers = [
  http.get('/shelters/:shelterId/profile/simple', async () => {
    await delay(200);
    const { shelterImageUrl, shelterName, shelterEmail, shelterAddress } =
      DUMMY_SHELTERINFO;
    return HttpResponse.json(
      {
        shelterImageUrl,
        shelterName,
        shelterEmail,
        shelterAddress,
      },
      { status: 200 },
    );
  }),
  http.get('/shelters/:shelterId/profile', async ({ params }) => {
    const shelterId = Number(params.shelterId);
    await delay(200);
    return HttpResponse.json(
      {
        shelterId,
        ...DUMMY_SHELTERINFO,
      },
      { status: 200 },
    );
  }),
  http.get('/shelters/:shelterId/reviews', async ({ request }) => {
    await delay(1000);
    const url = new URL(request.url);
    const page = url.searchParams.get('page');

    return HttpResponse.json(
      {
        pageInfo: {
          totalElements: 30,
          hasNext: page === '3' ? false : true,
        },
        reviews: Array.from({ length: 10 }, (_, index) => ({
          ...DUMMY_SHELTER_REVIEW,
          reviewId: index,
        })),
      },
      {
        status: 200,
      },
    );
  }),
];
