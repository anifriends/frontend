import { useBoolean } from '@chakra-ui/react';

const useToggle = (initialState: boolean): [boolean, () => void] => {
  const [isTrue, setIsTrue] = useBoolean(initialState);

  const toggle = () => {
    setIsTrue.toggle();
  };

  return [isTrue, toggle];
};

export default useToggle;
