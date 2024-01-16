import { Select, SelectProps } from '@chakra-ui/react';

export function FilterSelect({ children, ...props }: SelectProps) {
  return (
    <Select rounded="full" sx={{ width: 'auto' }} {...props}>
      {children}
    </Select>
  );
}
