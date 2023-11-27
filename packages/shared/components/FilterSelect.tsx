import { Select, SelectProps } from '@chakra-ui/react';

export default function FilterSelect({ children, ...props }: SelectProps) {
  return (
    <Select rounded="full" sx={{ width: 'auto' }} {...props}>
      {children}
    </Select>
  );
}
