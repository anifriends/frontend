import { PAGE_TYPE } from '@anifriends/constants';
import { PageType } from '@anifriends/types';
import { useEffect, useState } from 'react';

export const useBottomNavBar = (pageType?: PageType) => {
  const [isBottomNavBarVisible, setIsBottomNavBarVisible] = useState(false);

  useEffect(() => {
    if (
      pageType === PAGE_TYPE.VOLUNTEERS ||
      pageType === PAGE_TYPE.ANIMALS ||
      pageType === PAGE_TYPE.CHATTINGS ||
      pageType === PAGE_TYPE.MYPAGE
    ) {
      return setIsBottomNavBarVisible(true);
    }

    return setIsBottomNavBarVisible(false);
  }, [pageType]);

  return { isBottomNavBarVisible };
};
