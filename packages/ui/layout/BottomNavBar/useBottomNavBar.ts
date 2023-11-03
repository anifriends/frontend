import { useEffect, useState } from 'react';
import { useMatches, useNavigate } from 'react-router-dom';
import { PageType } from 'types/page';

export const useBottomNavBar = () => {
  const [selected, setSelected] = useState<
    'volunteers' | 'animals' | 'chattings' | 'mypage'
  >();
  const [pageType, setPageType] = useState<PageType>();

  const match = useMatches().at(-1);
  const navigate = useNavigate();

  useEffect(() => {
    const [, page] = match?.id?.split(':') ?? [undefined, undefined];

    setPageType(page as PageType);
  }, [match]);

  useEffect(() => {
    if (pageType === 'VOLUNTEERS') {
      return setSelected('volunteers');
    }
    if (pageType === 'ANIMALS') {
      return setSelected('animals');
    }
    if (pageType === 'CHATTINGS') {
      return setSelected('chattings');
    }
    if (pageType === 'MYPAGE') {
      return setSelected('mypage');
    }
    return setSelected(undefined);
  }, [pageType]);

  const goVounteers = () => navigate('/volunteers');
  const goAnimals = () => navigate('/animals');
  const goChattings = () => navigate('/chattings');
  const goMyPage = () => navigate('/mypage');

  return {
    selected,
    goVounteers,
    goAnimals,
    goChattings,
    goMyPage,
  };
};
