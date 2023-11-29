import { delay, http, HttpResponse } from 'msw';

const DUMMY_RECRUITMENT = {
  recruitmentId: 1,
  recruitmentTitle: '봉사자를 모집합니다',
  recruitmentStartTime: '2021-11-08T11:44:30.327959',
  recruitmentEndTime: '2021-11-08T11:44:30.327959',
  recruitmentDeadline: '2023-11-20T11:44:30.327959',
  recruitmentIsClosed: false,
  recruitmentApplicantCount: 15,
  recruitmentCapacity: 15,
};

const DUMMY_RECRUITMENT_LIST = Array.from(
  { length: 4 },
  () => DUMMY_RECRUITMENT,
);

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

export const DUMMY_APPLICANT_LIST = Array.from(
  { length: 9 },
  () => DUMMY_APPLICANT,
);

export const handlers = [
  http.get('/shelters/recruitments', async () => {
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
  http.patch(
    '/shelters/recruitments/:recruitmentId/applicants/:applicantId',
    async () => {
      await delay(200);
      return HttpResponse.json({}, { status: 200 });
    },
  ),
  http.get('/shelters/recruitments/:recruitmentId/applicants', async () => {
    await delay(200);
    return HttpResponse.json({
      applicants: DUMMY_APPLICANT_LIST,
      recruitmentCapacity: 15,
    });
  }),
];
