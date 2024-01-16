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

type RadioGroupProps<Value, Text> = Omit<ChakraRadioGroupProps, 'children'> & {
  value: Value;
  onChange: (nextValue: Value) => void;
  defaultValue?: Value;
  radios: Radio<Value, Text>[];
  hStackProps?: StackProps;
  radioProps?: RadioProps;
};

export function RadioGroup<Value extends string, Text extends string>({
  value,
  onChange,
  defaultValue,
  radios,
  hStackProps,
  radioProps,
  ...chakraRadioGropRestprops
}: RadioGroupProps<Value, Text>) {
  return (
    <ChakraRadioGroup
      colorScheme="orange"
      value={value}
      onChange={onChange}
      defaultValue={defaultValue}
      {...chakraRadioGropRestprops}
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
