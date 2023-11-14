export const createFormattedTime = (
  date: Date,
  format = 'YYYY.MM.DD',
): string => {
  const formatReplacements: Record<string, string> = {
    YYYY: date.getFullYear().toString(),
    MM: (date.getMonth() + 1).toString().padStart(2, '0'),
    DD: date.getDate().toString().padStart(2, '0'),
    hh: date.getHours().toString().padStart(2, '0'),
    mm: date.getMinutes().toString().padStart(2, '0'),
  };

  const formattedTime = format.replace(
    /YYYY|MM|DD|hh|mm/g,
    (match) => formatReplacements[match],
  );

  return formattedTime;
};
