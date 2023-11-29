import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: `'IBMPlexSans'`,
    body: `'IBMPlexSans'`,
  },
  styles: {
    global: {
      body: {
        overscrollBehavior: 'none',
      },
    },
  },
});

export default theme;
