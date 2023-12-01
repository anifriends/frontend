import { Button, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function NotReady() {
  const navigate = useNavigate();

  return (
    <VStack justify="center" align="center" h="full" spacing={6}>
      <Heading as="h4" fontSize="xl">
        준비중인 페이지입니다
      </Heading>
      <Text color="gray.400" fontWeight="semibold">
        홈 혹은 이전 페이지로 이동해주세요
      </Text>
      <HStack>
        <Button onClick={() => navigate(-1)}>이전으로</Button>
        <Button onClick={() => navigate('/volunteers')}>홈으로</Button>
      </HStack>
    </VStack>
  );
}
