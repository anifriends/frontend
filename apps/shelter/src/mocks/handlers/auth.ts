import { delay, http, HttpResponse } from 'msw';

export const handlers = [
  http.post('/auth/shelters/login', async () => {
    await delay(200);
    return HttpResponse.json(
      {
        accessToken: 'accessToken',
        userId: 1,
        role: 'ROLE_SEHLTER',
      },
      { status: 200 },
    );
  }),
  http.post('/auth/shelters/login', async () => {
    await delay(200);
    return HttpResponse.json(
      {
        errorCode: 'AF002',
        message: '이메일/비밀번호가 올바르지 않습니다',
      },
      { status: 400 },
    );
  }),
  http.post('/auth/shelters/login', async () => {
    await delay(200);
    return HttpResponse.json(
      {
        errorCode: 'AF001',
        message: '잘못된 입력값입니다',
      },
      { status: 400 },
    );
  }),
  http.post('/shelters', async () => {
    await delay(200);
    return HttpResponse.json({}, { status: 400 });
  }),
  http.post('/shelters', async () => {
    await delay(200);
    return HttpResponse.json(
      {
        errorCode: 'AF002',
        message: '{입력값}은 1자 이상, 20자 이하여야 합니다.',
      },
      { status: 400 },
    );
  }),
  http.post('/shelters', async () => {
    await delay(200);
    return HttpResponse.json(
      {
        errorCode: 'AF001',
        message: '요청값이 입력되지 않았습니다.. {}',
      },
      { status: 400 },
    );
  }),
  http.post('/shelters/email', async () => {
    await delay(200);
    return HttpResponse.json(
      {
        isDuplicated: false,
      },
      { status: 200 },
    );
  }),
  http.post('/shelters/email', async () => {
    await delay(200);
    return HttpResponse.json(
      {
        errorCode: 'AF001',
        message: '잘못된 입력값입니다',
      },
      { status: 400 },
    );
  }),
  http.patch('/shelters/me/passwords', async () => {
    await delay(200);
    return HttpResponse.json({}, { status: 200 });
  }),
];
