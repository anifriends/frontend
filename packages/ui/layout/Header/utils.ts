import PAGE_TYPE from '../../constants/pageType';
import { HeaderType } from '../../types/header';
import { PageType } from '../../types/page';

export const getHeaderType = (pageType: PageType): HeaderType =>
  PAGE_TYPE[pageType].headerType;

export const getHeaderTitle = (pageType: PageType) => PAGE_TYPE[pageType].title;
