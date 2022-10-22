import { useLayoutEffect, useState } from 'react';
import { checkIfAnimationDisabled } from 'utils';

export const useAnimationDisabled = () => {
  const [isDisabled, setIsDisabled] = useState(false);

  useLayoutEffect(() => {
    setIsDisabled(checkIfAnimationDisabled());
  }, []);

  return isDisabled;
};
