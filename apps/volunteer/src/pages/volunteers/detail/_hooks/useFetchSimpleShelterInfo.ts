import { useSuspenseQuery } from '@tanstack/react-query';

import { getSimpleShelterProfile } from '@/apis/shelter';

const useFetchSimpleShelterInfo = (shelterId: number) =>
  useSuspenseQuery({
    queryKey: ['shelter', 'simpleProfile', shelterId],
    queryFn: async () => (await getSimpleShelterProfile(shelterId)).data,
  });

export default useFetchSimpleShelterInfo;
