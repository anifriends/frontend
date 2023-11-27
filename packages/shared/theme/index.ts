import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: `'IBMPlexSans-Heading'`,
    body: `'IBMPlexSans-Body'`,
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
