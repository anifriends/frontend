import { HStack, Text } from '@chakra-ui/react';

type DateTextProps = {
  label: string;
  date: string;
};

export default function DateText({ label, date }: DateTextProps) {
  return (
    <HStack spacing={1}>
      <Text color="gray.400" fontSize="xs" fontWeight="medium" lineHeight={5}>
        {label}
      </Text>
      <Text color="gray.500" fontSize="xs" fontWeight="semibold" lineHeight={5}>
        {date}
      </Text>
    </HStack>
  );
}
