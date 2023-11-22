import { useQuery } from '@tanstack/react-query';

import { getMyVolunteerInfo } from '@/apis/volunteer';

const useFetchAccount = () =>
  useQuery({
    queryKey: ['volunteer', 'account'],
    queryFn: async () => (await getMyVolunteerInfo()).data,
    select: (data) => {
      return {
        imageUrl: data.volunteerImageUrl,
        email: data.volunteerEmail,
        name: data.volunteerName,
        birthDate: data.volunteerBirthDate,
        phoneNumber: data.volunteerPhoneNumber,
        gender: data.volunteerGender,
      };
    },
    initialData: {
      volunteerId: 1,
      volunteerEmail: '',
      volunteerName: '',
      volunteerBirthDate: '',
      volunteerPhoneNumber: '',
      volunteerTemperture: 36,
      volunteerCount: 0,
      volunteerImageUrl: '',
      volunteerGender: 'MALE',
    },
  });

export default useFetchAccount;
