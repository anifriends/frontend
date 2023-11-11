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

type RadioAttributes<RadioValue, RadioText> = {
  value: RadioValue;
  text: RadioText;
};

type RadioGroupProps<RadioValue, RadioText> = {
  value: RadioValue;
  changeValue: (nextValue: RadioValue) => void;
  radioAttributes: RadioAttributes<RadioValue, RadioText>[];
  radioGroupProps?: ChakraRadioGroupProps;
  hStackProps?: StackProps;
  radioProps?: RadioProps;
};

export default function RadioGroup<
  RadioValue extends string,
  RadioText extends string,
>({
  value,
  changeValue,
  radioAttributes,
  radioGroupProps,
  hStackProps,
  radioProps,
}: RadioGroupProps<RadioValue, RadioText>) {
  return (
    <ChakraRadioGroup
      value={value}
      onChange={changeValue}
      colorScheme="orange"
      {...radioGroupProps}
    >
      <HStack spacing={16} {...hStackProps}>
        {radioAttributes.map(
          ({ value, text }: RadioAttributes<RadioValue, RadioText>) => (
            <Radio key={value} value={value} {...radioProps}>
              {text}
            </Radio>
          ),
        )}
      </HStack>
    </ChakraRadioGroup>
  );
}
