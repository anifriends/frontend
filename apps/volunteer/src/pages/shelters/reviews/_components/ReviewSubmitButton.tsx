import { Button, VStack } from '@chakra-ui/react';

type ReviewSubmitButton = {
  formId: string;
  buttonText: string;
};

export default function ReviewSubmitButton({
  formId,
  buttonText,
}: ReviewSubmitButton) {
  return (
    <VStack
      maxW="container.sm"
      mx="auto"
      px={4}
      bgColor="white"
      pos="fixed"
      bottom={0}
      left={0}
      right={0}
      py={2}
      zIndex={10}
      align="stretch"
    >
      <Button
        fontWeight="semibold"
        bgColor="orange.400"
        color="white"
        type="submit"
        form={formId}
        _hover={{ bg: undefined }}
        _active={{ bg: undefined }}
      >
        {buttonText}
      </Button>
    </VStack>
  );
}
