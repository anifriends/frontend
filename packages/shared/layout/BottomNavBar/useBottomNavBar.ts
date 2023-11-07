import { useEffect, useState } from 'react';

import { PageType } from '../../types/page';

export const useBottomNavBar = (pageType?: PageType) => {
  const [isBottomNavBarVisible, setIsBottomNavBarVisible] = useState(false);

  useEffect(() => {
    if (
      pageType === 'VOLUNTEERS' ||
      pageType === 'ANIMALS' ||
      pageType === 'CHATTINGS' ||
      pageType === 'MYPAGE'
    ) {
      return setIsBottomNavBarVisible(true);
    }

    return setIsBottomNavBarVisible(false);
  }, [pageType]);

  return { isBottomNavBarVisible };
};
