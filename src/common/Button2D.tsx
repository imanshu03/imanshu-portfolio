import React from 'react';
import clsx from 'classnames';
import { useMobileDevice } from '@hooks/useMobileDevice';
import { useAnimationDisabled } from '@hooks/useAnimationDisabled';

interface IButton2D {
  onClick?: () => void;
  className?: string;
  children: any;
}
const Button2D: React.FC<IButton2D> = (props) => {
  const { onClick, className, children } = props;
  const isMobileDevice = useMobileDevice();
  const isAnimationDisabled = useAnimationDisabled();
  return (
    <button
      onClick={onClick}
      className={clsx(
        'px-[2rem] py-[0.4rem] text-white text-xs md:text-sm lg:text-base bg-transparent border border-solid border-white rounded-full cursor-pointer',
        { '!cursor-none': !isMobileDevice && !isAnimationDisabled },
        className,
      )}
    >
      {children}
    </button>
  );
};

export default Button2D;
