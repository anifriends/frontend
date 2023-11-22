import { delay, http, HttpResponse } from 'msw';

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
];
