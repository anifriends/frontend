export const createFormattedTime = (date: Date, token = '.'): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}${token}${month}${token}${day}`;
};
