import { Badge } from '@chakra-ui/react';

const LABEL_BACKGROUND_COLOR = {
  GREEN: 'green.300',
  ORANGE: 'orange.400',
  YELLOW: 'yellow.300',
  RED: 'red.400',
} as const;

type LabelProps = {
  title: string;
  type?: keyof typeof LABEL_BACKGROUND_COLOR;
};

export default function Label({ title, type = 'GREEN' }: LabelProps) {
  return (
    <Badge
      variant="solid"
      color="white"
      bgColor={LABEL_BACKGROUND_COLOR[type]}
      fontSize="sm"
    >
      {title}
    </Badge>
  );
}
