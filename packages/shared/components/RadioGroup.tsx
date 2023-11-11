import type {
  RadioGroupProps as ChakraRadioGroupProps,
  RadioProps,
  StackProps,
} from '@chakra-ui/react';
import {
  HStack,
  Radio,
  RadioGroup as ChakraRadioGroup,
} from '@chakra-ui/react';

type Radio<Value, Text> = {
  value: Value;
  text: Text;
};

type RadioGroupProps<Value, Text> = {
  value: Value;
  onChange: (nextValue: Value) => void;
  radios: Radio<Value, Text>[];
  radioGroupProps?: ChakraRadioGroupProps;
  hStackProps?: StackProps;
  radioProps?: RadioProps;
};

export default function RadioGroup<Value extends string, Text extends string>({
  value,
  onChange,
  radios,
  radioGroupProps,
  hStackProps,
  radioProps,
}: RadioGroupProps<Value, Text>) {
  return (
    <ChakraRadioGroup
      value={value}
      onChange={onChange}
      colorScheme="orange"
      {...radioGroupProps}
    >
      <HStack spacing={16} {...hStackProps}>
        {radios.map(({ value, text }: Radio<Value, Text>) => (
          <Radio key={value} value={value} {...radioProps}>
            {text}
          </Radio>
        ))}
      </HStack>
    </ChakraRadioGroup>
  );
}
