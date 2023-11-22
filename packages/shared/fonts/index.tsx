import { Global } from '@emotion/react';

export default function Fonts() {
  return (
    <Global
      styles={`
      @font-face {
        font-family: 'IBMPlexSans-Heading';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-07@1.0/IBMPlexSansKR-Regular.woff') format('woff');
      }

      @font-face {
        font-family: 'IBMPlexSans-Body';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-07@1.0/IBMPlexSansKR-Regular.woff') format('woff');
      }
    `}
    />
  );
}
