import React, { forwardRef } from 'react';
import clsx from 'classnames';

interface IButton3D {
  children?: React.ReactNode;
  className?: string;
}

const Button3D = forwardRef<any, IButton3D>(function Button3D(props, ref) {
  const { children, className } = props;
  return (
    <div className={clsx('button-3d', className)} ref={ref}>
      <div className="button-3d-main-bar">
        <div className="button-3d-content">{children}</div>
      </div>
      <div className="button-3d-bottom-bar" />
    </div>
  );
});

export default Button3D;