import { useSuspenseQuery } from '@tanstack/react-query';

import { getMyVolunteerInfo } from '@/apis/volunteer';

const useFetchMyVolunteer = () =>
  useSuspenseQuery({
    queryKey: ['myVolunteer'],
    queryFn: async () => (await getMyVolunteerInfo()).data,
  });

export default useFetchMyVolunteer;
