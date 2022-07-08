import React, { forwardRef, memo } from 'react';
import clsx from 'classnames';

type VARIANT_TYPES = 'h1' | 'h2' | 'h3';

interface IProps {
  className: string;
  shadowClassName?: string;
  children: React.ReactNode;
  variant?: VARIANT_TYPES;
}

const TextWithShadow = forwardRef<React.MutableRefObject<any>, IProps>(
  (props, ref) => {
    const { variant = 'h1', className, shadowClassName, children } = props;

    return React.createElement(
      variant,
      {
        className: clsx(
          'relative',
          className,
          shadowClassName,
          {
            'hd1-size': variant === 'h1',
          },
          { 'hd2-size': variant === 'h2' },
          { 'hd3-size': variant === 'h3' },
        ),
        ref,
      },
      children,
    );
  },
);

TextWithShadow.displayName = 'TextWithShadow';

export default memo(TextWithShadow);
