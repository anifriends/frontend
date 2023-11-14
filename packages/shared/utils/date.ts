import { MILISECONDS } from '../constants/date';

export const createFormattedTime = (
  date: Date,
  format = 'YYYY.MM.DD',
): string => {
  const formatReplacements: Record<string, string> = {
    YYYY: String(date.getFullYear()),
    MM: String(date.getMonth() + 1).padStart(2, '0'),
    DD: String(date.getDate()).padStart(2, '0'),
    hh: String(date.getHours()).padStart(2, '0'),
    mm: String(date.getMinutes()).padStart(2, '0'),
  };

  const formattedTime = format.replace(
    /YYYY|MM|DD|hh|mm/g,
    (match) => formatReplacements[match],
  );

  return formattedTime;
};

export const isSameDay = (a: Date, b: Date): boolean => {
  const diff = (a.getTime() - b.getTime()) / 1000;

  return Math.trunc(diff / MILISECONDS.DAY) === 0;
};

export function getDDay(deadLine: string) {
  const deadLineDate = new Date(deadLine).getTime();
  const currentDate = new Date().getTime();
  const diffDate = deadLineDate - currentDate;

  return Math.floor(diffDate / (1000 * MILISECONDS.DAY)).toString();
}
