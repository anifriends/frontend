export function getFullDate(dateString: string) {
  const date = new Date(dateString);
  return `${date.getFullYear()}.${date.getMonth()}.${date.getDay()}.`;
}

export function getTime(dateString: string) {
  const date = new Date(dateString);
  return `${date.getHours()}:${date.getMonth()}`;
}

export function getDDay(deadLine: string) {
  const deadLineDate = new Date(deadLine).getTime();
  const currentDate = new Date().getTime();
  const diffDate = deadLineDate - currentDate;

  return Math.floor(diffDate / (1000 * 60 * 60 * 24)).toString();
}
