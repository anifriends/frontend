import { ChakraProvider } from '@chakra-ui/react';
import { RouterProvider } from 'react-router-dom';

import { router } from '@/routes';

export default function App() {
  return (
    <ChakraProvider resetCSS>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}
