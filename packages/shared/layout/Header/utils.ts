import headerTitle from '../../constants/headerTitle';
import HEADER_TYPE from '../../constants/headerType';
import { HeaderType } from '../../types/header';
import { PageType } from '../../types/page';

export const getHeaderType = (pageType: PageType): HeaderType => {
  if (
    pageType === 'VOLUNTEERS' ||
    pageType === 'ANIMALS' ||
    pageType === 'CHATTINGS' ||
    pageType === 'MYPAGE'
  ) {
    return HEADER_TYPE.DEFAULT;
  }

  if (pageType === 'VOLUNTEERS_SEARCH' || pageType === 'ANIMALS_SEARCH') {
    return HEADER_TYPE.SEARCH;
  }

  return HEADER_TYPE.DETAIL;
};

export const getHeaderTitle = (pageType: PageType): string =>
  headerTitle[pageType];
