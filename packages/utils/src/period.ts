import type { Period } from '@anifriends/types';

import { createFormattedTime } from './date';

const periodEndDate: Record<Period, (date: Date) => number> = {
  WITHIN_ONE_DAY: (date: Date) => date.getDate() + 1,
  WITHIN_ONE_WEEK: (date: Date) => date.getDate() + 7,
  WITHIN_ONE_MONTH: (date: Date) => date.getMonth() + 1,
  WITHIN_THREE_MONTH: (date: Date) => date.getMonth() + 3,
};

export const getDatesFromPeriod = (period?: Period) => {
  if (!period) {
    return {
      startDate: undefined,
      endDate: undefined,
    };
  }

  const startDate = new Date();
  const endDate = new Date();

  endDate.setDate(periodEndDate[period](startDate));

  return {
    startDate: createFormattedTime(startDate, 'YYYY-MM-DD'),
    endDate: createFormattedTime(endDate, 'YYYY-MM-DD'),
  };
};
