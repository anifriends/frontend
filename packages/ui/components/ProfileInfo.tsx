import { Avatar, HStack, Text, VStack } from '@chakra-ui/react';

type ProfileInfoProps = {
  imageUrl?: string;
  name: string;
  email: string;
  address?: string;
  phoneNumber?: string;
  children?: React.ReactNode;
};

export default function ProfileInfo({
  imageUrl,
  name,
  email,
  address,
  phoneNumber,
  children,
}: ProfileInfoProps) {
  return (
    <HStack spacing={5} py={3.5} align="flex-start">
      <Avatar src={imageUrl} boxSize="4.4rem" />
      <VStack align="left" gap={0}>
        <HStack align="center" spacing={3}>
          <Text fontSize="md" fontWeight="semibold">
            {name}
          </Text>
          {children}
        </HStack>
        <Text fontSize="sm" fontWeight="normal">
          {email}
        </Text>
        <Text fontSize="sm" fontWeight="normal">
          {address || phoneNumber}
        </Text>
      </VStack>
    </HStack>
  );
}
