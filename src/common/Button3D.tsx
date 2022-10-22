import React, { forwardRef } from 'react';
import clsx from 'classnames';
import { useAnimationDisabled } from '@hooks/useAnimationDisabled';
import { useMobileDevice } from '@hooks/useMobileDevice';

interface IButton3D {
  children?: React.ReactNode;
  className?: string;
  onMouseUp?: () => void;
}

const Button3D = forwardRef<any, IButton3D>(function Button3D(props, ref) {
  const { children, className, onMouseUp } = props;
  const isMobileDevice = useMobileDevice();
  const isAnimationDisabled = useAnimationDisabled();
  return (
    <div
      className={clsx(
        'button-3d cursor-pointer',
        { '!cursor-none': !isMobileDevice && !isAnimationDisabled },
        className,
      )}
      ref={ref}
      onMouseUp={onMouseUp}
    >
      <div className="button-3d-main-bar">
        <div className="button-3d-content">{children}</div>
      </div>
      <div className="button-3d-bottom-bar" />
    </div>
  );
});

export default Button3D;
