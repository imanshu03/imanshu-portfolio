import React, { forwardRef, memo } from 'react';
import clsx from 'classnames';

interface IProps {
  children: React.ReactNode;
  className: string;
}

const SubText = forwardRef<React.MutableRefObject<any>, IProps>(
  (props, ref) => {
    const { children, className } = props;

    return (
      <h3 className={clsx('hd3-size font-light', className)} ref={ref as any}>
        {children}
      </h3>
    );
  },
);

SubText.displayName = 'SubText';

export default memo(SubText);
