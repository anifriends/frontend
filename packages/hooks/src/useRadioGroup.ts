import { useState } from 'react';

export const useRadioGroup = <Value extends string>(
  initialValue: Value,
): [Value, (nextValue: Value) => void] => {
  const [value, setValue] = useState<Value>(initialValue);

  const changeValue = (nextValue: Value) => setValue(nextValue);

  return [value, changeValue];
};
