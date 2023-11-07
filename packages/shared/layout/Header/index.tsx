import { AppType } from 'types/app';

import { usePageType } from '../../hooks/usePageType';
import DefaultHeader from './DefaultHeader';
import DetailHeader from './DetailHeader';
import SearchHeader from './SearchHeader';
import { useHeader } from './useHeader';

const Headers = {
  DEFAULT: (props: HeaderProps) => <DefaultHeader {...props} />,
  DETAIL: (props: HeaderProps) => <DetailHeader {...props} />,
  SEARCH: () => <SearchHeader />,
};

export type HeaderProps = {
  appType: AppType;
};

export default function Header({ appType }: HeaderProps) {
  const { pageType } = usePageType();
  const { headerType } = useHeader();

  if (!pageType) {
    return null;
  }

  return Headers[headerType]({ appType });
}
