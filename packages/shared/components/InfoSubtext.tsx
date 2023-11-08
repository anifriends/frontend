import { HStack, Text } from '@chakra-ui/react';

type InfoSubtext = {
  title: string;
  content: string;
};

export default function InfoSubtext({ title, content }: InfoSubtext) {
  return (
    <HStack spacing={1}>
      <Text color="gray.400" fontSize="xs" fontWeight="medium" lineHeight={5}>
        {title}
      </Text>
      <Text color="gray.500" fontSize="xs" fontWeight="semibold" lineHeight={5}>
        {content}
      </Text>
    </HStack>
  );
}
