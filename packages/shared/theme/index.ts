import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: `'Pretendard-Heading'`,
    body: `'Pretendard-Body'`,
  },
  styles: {
    global: {
      body: {
        'overscroll-behavior': 'none',
      },
    },
  },
});

export default theme;
