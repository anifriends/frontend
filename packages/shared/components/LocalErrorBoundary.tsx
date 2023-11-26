import { Button, Heading, Text, VStack } from '@chakra-ui/react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

const RetryErrorFallback = ({ resetErrorBoundary }: FallbackProps) => {
  return (
    <VStack justifyContent="center" alignItems="center" h="full" spacing="4">
      <Heading as="h4" fontSize="lg" fontWeight="bold">
        잠시 연결이 늦어지고 있습니다.
      </Heading>
      <Text color="gray.400">다시 한번 시도해 주세요</Text>
      <Button onClick={resetErrorBoundary}>다시 시도</Button>
    </VStack>
  );
};

const FallbackComponent = (props: FallbackProps) => {
  // 만약 api erro가 발생하면 throw props.error

  return <RetryErrorFallback {...props} />;
};

export default function LocalErrorBoundary({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ErrorBoundary FallbackComponent={FallbackComponent}>
      {children}
    </ErrorBoundary>
  );
}
