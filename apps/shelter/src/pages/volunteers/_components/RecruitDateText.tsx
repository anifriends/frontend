import { Text } from '@chakra-ui/react';

type RecruitDateTextProps = {
  title: string;
  date: string;
  time: string;
};

export default function RecruitDateText({
  title,
  date,
  time,
}: RecruitDateTextProps) {
  return <Text fontSize="xs">{`${title} | ${date} • ${time}`}</Text>;
}
