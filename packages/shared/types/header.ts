import HEADER_TYPE from '../constants/headerType';

export type HeaderType = keyof typeof HEADER_TYPE;

export type HeaderOption = {
  onMenuClick?: VoidFunction;
  onSubmit?: (keyword: string) => void;
};

export type CommonHeaderProps = {
  headerOption?: HeaderOption;
};

export type HeaderProps = {
  title: string;
  headerOption?: HeaderOption;
};
