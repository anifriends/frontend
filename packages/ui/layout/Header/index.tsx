import { CommonHeaderProps, HeaderProps } from '../../types/header';
import DefaultHeader from './DefaultHeader';
import DetailHeader from './DetailHeader';
import SearchHeader from './SearchHeader';
import { useHeader } from './useHeader';

const Headers = {
  DEFAULT: (props: HeaderProps) => <DefaultHeader {...props} />,
  DETAIL: (props: HeaderProps) => <DetailHeader {...props} />,
  SEARCH: (props: HeaderProps) => <SearchHeader {...props} />,
};

export default function Header({ headerOption }: CommonHeaderProps) {
  const { headerType, title } = useHeader();

  return Headers[headerType]({ title, headerOption });
}
