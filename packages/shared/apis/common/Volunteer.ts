import axiosInstance from 'apis/axiosInstance';

export const getVolunteerProfileInfo = (recruitmentId: number) =>
  axiosInstance.get<{
    volunteerEmail: string;
    volunteerName: string;
    volunteerTemperate: number;
    volunteerImageUrl: string;
    volunteerPhoneNumber: string;
  }>(`/recruitments/${recruitmentId}`);
