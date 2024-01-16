import { useBoolean } from '@chakra-ui/react';

export const useToggle = (initialState = false): [boolean, () => void] => {
  const [isTrue, setIsTrue] = useBoolean(initialState);

  const toggle = () => {
    setIsTrue.toggle();
  };

  return [isTrue, toggle];
};
