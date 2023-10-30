import { ChakraProvider } from '@chakra-ui/react';
import { CustomButton, Header } from 'ui';

export default function App() {
  return (
    <ChakraProvider>
      <Header />
      보호소 어플리케이션
      <CustomButton />
    </ChakraProvider>
  );
}
