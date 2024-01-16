import { HEADER_TYPE, headerTitle, PAGE_TYPE } from '@anifriends/constants';
import { HeaderType, PageType } from '@anifriends/types';

export const getHeaderType = (pageType: PageType): HeaderType => {
  if (
    pageType === PAGE_TYPE.VOLUNTEERS ||
    pageType === PAGE_TYPE.ANIMALS ||
    pageType === PAGE_TYPE.CHATTINGS ||
    pageType === PAGE_TYPE.MYPAGE
  ) {
    return HEADER_TYPE.DEFAULT;
  }

  if (
    pageType === PAGE_TYPE.VOLUNTEERS_SEARCH ||
    pageType === PAGE_TYPE.ANIMALS_SEARCH
  ) {
    return HEADER_TYPE.SEARCH;
  }

  return HEADER_TYPE.DETAIL;
};

export const getHeaderTitle = (pageType: PageType): string =>
  headerTitle[pageType];
