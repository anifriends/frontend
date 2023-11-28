import { Button, Heading, Text, VStack } from '@chakra-ui/react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';
import { getErrorMessage } from 'utils/errorMessage';

const RetryErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const { status } = error.response;
  const { title, content } = getErrorMessage(status);
  const navigate = useNavigate();
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
    <VStack justifyContent="center" alignItems="center" h="full" spacing="4">
      <Heading as="h4" fontSize="lg" fontWeight="bold">
        {title}
      </Heading>
      <Text color="gray.400">{content}</Text>
      {!isForbidden && <Button onClick={onClick}>{buttonMessage}</Button>}
      <Button onClick={() => navigate('/volunteers')}>홈으로</Button>
    </VStack>
  );
};

const FallbackComponent = (props: FallbackProps) => {
  // TODO accessToken 갱신 api가 정상화되면
  //만약 api error혹은 401에러가 발생하면 throw props.error

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
