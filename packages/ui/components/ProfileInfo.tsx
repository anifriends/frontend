import { Avatar, HStack, Text, VStack } from '@chakra-ui/react';

type ProfileInfoProps = {
  infoImage?: string;
  infoTitle: string;
  infoTexts?: string[];
  children?: React.ReactNode;
};

export default function ProfileInfo({
  infoImage,
  infoTitle,
  infoTexts,
  children,
}: ProfileInfoProps) {
  return (
    <HStack spacing={5} py={3.5} align="flex-start">
      <Avatar src={infoImage} boxSize="4.4rem" />
      <VStack align="left" gap={0}>
        <HStack align="center" spacing={3}>
          <Text fontSize="md" fontWeight="semibold">
            {infoTitle}
          </Text>
          {children}
        </HStack>
        {infoTexts &&
          infoTexts.map((infoText, index) => (
            <Text key={index} fontSize="sm" fontWeight="normal">
              {infoText}
            </Text>
          ))}
      </VStack>
    </HStack>
  );
}
