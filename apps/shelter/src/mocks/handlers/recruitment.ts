import { delay, http, HttpResponse } from 'msw';

const randomDate = (start: Date, end: Date) =>
  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

const currentDate = new Date();
const startDate = new Date(currentDate);
const endDate = new Date(currentDate);
startDate.setDate(currentDate.getDate() - 30);
endDate.setDate(endDate.getDate() + 30);

const getRandomDummyRecruitment = () => ({
  recruitmentId: Number(String(Math.random()).slice(2)),
  shelterId: Number(String(Math.random()).slice(2)),
  recruitmentTitle: '봉사자를 모집합니다',
  recruitmentStartTime: randomDate(startDate, endDate),
  recruitmentEndTime: randomDate(startDate, endDate),
  recruitmentDeadline: randomDate(startDate, endDate),
  recruitmentIsClosed: Boolean(Math.floor(Math.random() * 2)),
  recruitmentApplicantCount: Math.floor(Math.random() * 15),
  recruitmentCapacity: 20,
});

export const DUMMY_APPLICANT = {
  applicantId: 10,
  volunteerId: 1,
  volunteerName: '김철수',
  volunteerBirthDate: '1997-11-05',
  volunteerGender: 'MALE',
  completedVolunteerCount: 3,
  volunteerTemperature: 33,
  applicantStatus: 'APPROVED',
};

export const DUMMY_APPLICANT_LIST = Array.from({ length: 9 }, (_, index) => {
  return {
    ...DUMMY_APPLICANT,
    volunteerName: !(index % 2) ? '김철수' : '김영희',
  };
});

export const handlers = [
  http.get('/shelters/recruitments', async () => {
    await delay(1000);
    return HttpResponse.json(
      {
        pageInfo: {
          totalElements: 100,
          hasNext: true,
        },
        recruitments: Array.from({ length: 4 }, () => ({
          ...getRandomDummyRecruitment(),
        })),
      },
      { status: 200 },
    );
  }),
  http.patch(
    '/shelters/recruitments/:recruitmentId/applicants/:applicantId',
    async () => {
      await delay(200);
      return HttpResponse.json({}, { status: 200 });
    },
  ),
  http.patch(
    '/shelters/recruitments/:recruitmentId/applicants/:applicantId',
    async () => {
      await delay(200);
      return HttpResponse.json(
        {
          errorCode: 'AF301',
          message: '해당 모집글에 대해 권한이 없습니다',
        },
        { status: 403 },
      );
    },
  ),
  http.patch(
    '/shelters/recruitments/:recruitmentId/applicants/:applicantId',
    async () => {
      await delay(200);
      return HttpResponse.json(
        {
          errorCode: 'AF401',
          message: '해당 모집글을 신청한 봉사자가 아닙니다',
        },
        { status: 404 },
      );
    },
  ),
  http.get('/shelters/recruitments/:recruitmentId/applicants', async () => {
    await delay(200);
    return HttpResponse.json({
      applicants: DUMMY_APPLICANT_LIST,
      recruitmentCapacity: 15,
    });
  }),
  http.post('/shelters/recruitments', async () => {
    await delay(1000);
    return HttpResponse.json({}, { status: 201 });
  }),
  http.patch('/shelters/recruitments/:recruitmentId', async ({ request }) => {
    console.log(request);
    await delay(1000);
    return HttpResponse.json({ status: 204 });
  }),
  http.delete('/shelters/recruitments/:recruitmentId', async ({ request }) => {
    console.log(request);
    await delay(1000);
    return HttpResponse.json({ status: 204 });
  }),
  http.patch(
    '/shelters/recruitments/:recruitmentId/close',
    async ({ request }) => {
      console.log(request);
      await delay(1000);
      return HttpResponse.json({ status: 204 });
    },
  ),
];
