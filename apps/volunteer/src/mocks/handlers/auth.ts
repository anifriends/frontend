import { delay, http, HttpResponse } from 'msw';

export const handlers = [
  http.post('/auth/volunteers/login', async () => {
    await delay(200);
    return HttpResponse.json(
      {
        accessToken: 'accessToken',
        userId: 1,
        role: 'ROLE_VOLUNTEER',
      },
      { status: 200 },
    );
  }),
  http.post('/auth/volunteers/login', async () => {
    await delay(200);
    return HttpResponse.json(
      {
        errorCode: 'AF002',
        message: '이메일/비밀번호가 올바르지 않습니다',
      },
      { status: 400 },
    );
  }),
  http.post('/auth/volunteers/login', async () => {
    await delay(200);
    return HttpResponse.json(
      {
        errorCode: 'AF001',
        message: '잘못된 입력값입니다',
      },
      { status: 400 },
    );
  }),
  http.post('/volunteers', async () => {
    await delay(200);
    return HttpResponse.json({}, { status: 200 });
  }),
  http.post('/volunteers', async () => {
    await delay(200);
    return HttpResponse.json(
      {
        errorCode: 'AF001',
        message: '{입력값}이 잘못되었습니다.',
      },
      { status: 400 },
    );
  }),
  http.post('/volunteers/email', async () => {
    await delay(200);
    return HttpResponse.json(
      {
        isDuplicated: false,
      },
      { status: 200 },
    );
  }),
  http.post('/volunteers/email', async () => {
    await delay(200);
    return HttpResponse.json(
      {
        errorCode: 'AF001',
        message: '잘못된 입력값입니다',
      },
      { status: 400 },
    );
  }),
];
