import { delay, http, HttpResponse } from 'msw';

const DUMMY_IMAGE = 'https://source.unsplash.com/random';
const DUMMY_IMAGE_LIST = Array.from({ length: 4 }, () => DUMMY_IMAGE);
const DUMMY_REVIEW = {
  reviewId: 32,
  reviewCreatedAt: '2023-03-16T18:00',
  reviewContent: '시설이 너무 깨끗하고 강아지도...',
  reviewImageUrls: DUMMY_IMAGE_LIST,
  volunteerName: '강혜린',
  volunteerTemperature: 44,
  volunteerReviewCount: 4,
  volunteerImageUrl: DUMMY_IMAGE,
};
const DUMMY_REVIEW_LIST = Array.from({ length: 4 }, () => DUMMY_REVIEW);

export const handlers = [
  http.get('/shelters/me', async () => {
    await delay(200);
    return HttpResponse.json(
      {
        shelterId: 1,
        shelterEmail: 'Shelter1234@gmail.com',
        shelterName: '양천구 보호소',
        imageUrl: null,
        shelterAddress: '서울특별시 양천구',
        shelterAddressDetail: '서울특별시 양천구 신월동 동자빌딩',
        shelterPhoneNumber: '010-1234-5678',
        shelterSparePhoneNumber: '02-345-6780',
        shelterIsOpenedAddress: true,
      },
      { status: 200 },
    );
  }),
  http.patch('/shelters/me/address/status', async () => {
    await delay(200);
    return HttpResponse.json({ status: 200 });
  }),
  http.get('/me/reviews', async () => {
    await delay(200);
    return HttpResponse.json(
      {
        pageInfo: {
          totalElements: 100,
          hasNext: true,
        },
        reviews: DUMMY_REVIEW_LIST,
      },
      { status: 200 },
    );
  }),
];
