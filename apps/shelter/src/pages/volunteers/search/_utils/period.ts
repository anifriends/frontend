import { createFormattedTime } from 'shared/utils/date';

import { Period } from '@/pages/volunteers/search/_types/filter';

export const getDatesFromPeriod = (period?: Period) => {
  if (!period) {
    return {
      startDate: undefined,
      endDate: undefined,
    };
  }

  const startDate = new Date();
  const endDate = new Date();

  if (period === 'WITHIN_ONE_DAY') {
    endDate.setDate(startDate.getDate() + 1);
  }
  if (period === 'WITHIN_ONE_WEEK') {
    endDate.setDate(startDate.getDate() + 7);
  }
  if (period === 'WITHIN_ONE_MONTH') {
    endDate.setMonth(startDate.getMonth() + 1);
  }
  if (period === 'WITHIN_THREE_MONTH') {
    endDate.setMonth(startDate.getMonth() + 3);
  }

  return {
    startDate: createFormattedTime(startDate, 'YYYY-MM-DD'),
    endDate: createFormattedTime(startDate, 'YYYY-MM-DD'),
  };
};
