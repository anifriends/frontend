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
];
