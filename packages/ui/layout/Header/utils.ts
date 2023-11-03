import { HeaderType } from 'types/header';
import { PageType } from 'types/page';

import PAGE_TYPE from '../../constants/pageType';

export const getHeaderType = (pageType: PageType): HeaderType =>
  PAGE_TYPE[pageType].headerType;

export const getHeaderTitle = (pageType: PageType) => PAGE_TYPE[pageType].title;
