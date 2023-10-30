import { ChakraProvider } from '@chakra-ui/react';
import { CustomButton, Header } from 'ui';

export default function App() {
  return (
    <ChakraProvider>
      <Header />
      봉사자 어플리케이션
      <CustomButton />
    </ChakraProvider>
  );
}
