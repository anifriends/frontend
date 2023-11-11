import { useState } from 'react';

const useRadioGroup = <RadioValue extends string>(
  initialValue: RadioValue,
): [RadioValue, (nextValue: RadioValue) => void] => {
  const [value, setValue] = useState<RadioValue>(initialValue);

  const changeValue = (nextValue: RadioValue) => setValue(nextValue);

  return [value, changeValue];
};

export default useRadioGroup;
