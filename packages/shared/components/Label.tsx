import { Badge } from '@chakra-ui/react';

const LABEL_BACKGROUND_COLOR = {
  GREEN: 'green.300',
  ORANGE: 'orange.400',
  YELLOW: 'yellow.300',
  RED: 'red.400',
  GRAY: 'gray.400',
} as const;

export type LabelProps = {
  labelTitle: string;
  type?: keyof typeof LABEL_BACKGROUND_COLOR;
};

export default function Label({ labelTitle, type = 'GREEN' }: LabelProps) {
  return (
    <Badge
      variant="solid"
      color="white"
      bgColor={LABEL_BACKGROUND_COLOR[type]}
      fontSize="sm"
      fontWeight="normal"
      lineHeight={4}
      textAlign="center"
      textTransform="uppercase"
      maxW={14}
    >
      {labelTitle}
    </Badge>
  );
}
