import { Global } from '@emotion/react';

export default function Fonts() {
  return (
    <Global
      styles={`
      @font-face {
        font-family: 'IBMPlexSans';
        font-style: normal;
        font-display: swap;
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-07@1.0/IBMPlexSansKR-Regular.woff') format('woff');
      }
    `}
    />
  );
}
