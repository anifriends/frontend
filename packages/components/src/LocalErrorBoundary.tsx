import { APP_TYPE } from '@anifriends/constants';
import { getErrorMessage, removeItemFromStorage } from '@anifriends/utils';
import { Button, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';

function RetryErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const navigate = useNavigate();
  const status = error?.response?.status;
  const { title, content } = getErrorMessage(status);

  const isNotAuthorized = status === 401;
  const isForbidden = status === 403;
  const buttonMessage = isNotAuthorized ? '로그인' : '다시 시도';

  if (isNotAuthorized) {
    removeItemFromStorage(APP_TYPE.VOLUNTEER_APP);
    removeItemFromStorage(APP_TYPE.SHELTER_APP);
  }

  return (
    <VStack justify="center" align="center" h="full" spacing={6}>
      <Heading as="h4" fontSize="xl">
        {title}
      </Heading>
      <Text color="gray.400" fontWeight="semi-bold">
        {content}
      </Text>
      <HStack spacing={6}>
        {!isForbidden && (
          <Button
            onClick={() => {
              resetErrorBoundary();
              isNotAuthorized && navigate('/signin');
            }}
          >
            {buttonMessage}
          </Button>
        )}
        <Button
          onClick={() => {
            resetErrorBoundary();
            navigate('/volunteers');
          }}
        >
          홈으로
        </Button>
      </HStack>
    </VStack>
  );
}

function FallbackComponent(props: FallbackProps) {
  // TODO accessToken 갱신 api가 정상화되면
  //만약 401, 403, 404 혹은 그 외 에러가 발생하면 throw props.error

  return <RetryErrorFallback {...props} />;
}

export function LocalErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary FallbackComponent={FallbackComponent} onReset={reset}>
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
