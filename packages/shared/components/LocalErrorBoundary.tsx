import { Button, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';

import { getErrorMessage } from '../utils/errorMessage';

const RetryErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const navigate = useNavigate();
  const status = error?.response?.status;
  const { title, content } = getErrorMessage(status);

  const isNotAuthorized = status === 401;
  const isForbidden = status === 403;
  const buttonMessage = isNotAuthorized ? '로그인' : '다시 시도';

  const onClick = () => {
    if (isNotAuthorized) {
      navigate('/login');
    } else {
      resetErrorBoundary();
    }
  };

  return (
    <VStack justifyContent="center" alignItems="center" h="full" spacing="6">
      <Heading as="h4" fontSize="xl">
        {title}
      </Heading>
      <Text color="gray.400" fontWeight="semi-bold">
        {content}
      </Text>
      <HStack spacing={6}>
        {!isForbidden && <Button onClick={onClick}>{buttonMessage}</Button>}
        <Button onClick={() => navigate('/volunteers')}>홈으로</Button>
      </HStack>
    </VStack>
  );
};

const FallbackComponent = (props: FallbackProps) => {
  // TODO accessToken 갱신 api가 정상화되면
  //만약 401, 403, 404 혹은 그 외 에러가 발생하면 throw props.error

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
