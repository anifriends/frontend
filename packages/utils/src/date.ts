import { MILISECONDS, WEEK_DAYS } from '@anifriends/constants';

export const createFormattedTime = (
  date: Date,
  format = 'YYYY.MM.DD',
): string => {
  const formatReplacements: Record<string, string> = {
    YYYY: String(date.getFullYear()),
    YY: String(date.getFullYear()).substring(2, 4),
    MM: String(date.getMonth() + 1).padStart(2, '0'),
    DD: String(date.getDate()).padStart(2, '0'),
    hh: String(date.getHours()).padStart(2, '0'),
    mm: String(date.getMinutes()).padStart(2, '0'),
  };

  const formattedTime = format.replace(
    /YYYY|YY|MM|DD|hh|mm/g,
    (match) => formatReplacements[match],
  );

  return formattedTime;
};

export const createWeekDayLocalString = (date: Date) => {
  return WEEK_DAYS[date.getDay()];
};

export const isSameDay = (a: Date, b: Date): boolean => {
  const diff = (a.getTime() - b.getTime()) / 1000;

  return Math.trunc(diff / MILISECONDS.DAY) === 0;
};

export const getDDay = (deadLine: string): number => {
  const deadLineDate = new Date(deadLine).getTime();
  const currentDate = new Date().getTime();
  const diffDate = deadLineDate - currentDate;

  return Math.floor(diffDate / (1000 * MILISECONDS.DAY));
};

export const getAge = (birthDate: string) => {
  const currentDate = new Date();
  const parsedBirthDate = new Date(birthDate);
  const age = currentDate.getFullYear() - parsedBirthDate.getFullYear() - 1;
  const isPassed =
    currentDate.getMonth() < parsedBirthDate.getMonth() ||
    (currentDate.getMonth() === parsedBirthDate.getMonth() &&
      currentDate.getDate() <= parsedBirthDate.getDate());

  return age + Number(isPassed);
};

export const getKoreanTime = (date: Date) => {
  date.setHours(date.getHours() + 9);
  return date;
};
