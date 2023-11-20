export const PERIOD = {
  WITHIN_ONE_DAY: '1일 이내',
  WITHIN_ONE_WEEK: '1주 이내',
  WITHIN_ONE_MONTH: '1달 이내',
  WITHIN_THREE_MONTH: '3달 이내',
} as const;

export const RECRUITMENT_STATUS = {
  IS_OPENED: '모집 중',
  IS_CLOSED: '모집 완료',
} as const;

export const SEARCH_TYPE = {
  IS_TITLE: '제목 포함',
  IS_CONTENT: '내용 포함',
} as const;
