import React, { forwardRef, memo } from 'react';

interface IProps {
  children: React.ReactNode;
  className: string;
}

const SubText = forwardRef<React.MutableRefObject<any>, IProps>(
  (props, ref) => {
    const { children, className } = props;

    const derivedClassName = [
      'text-xl md:text-2xl lg:text-3xl font-light',
      className,
    ].join(' ');

    return (
      <h3 className={derivedClassName} ref={ref as any}>
        {children}
      </h3>
    );
  },
);

SubText.displayName = 'SubText';

export default memo(SubText);
