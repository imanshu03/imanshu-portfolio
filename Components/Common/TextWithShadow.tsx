import React, { forwardRef, memo } from 'react';
import clsx from 'classnames';

type VARIANT_TYPES = 'h1' | 'h2' | 'h3' | 'h4';

interface IProps {
  className: string;
  shadowClassName: string;
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
            'text-6xl md:text-7xl lg:text-8xl': variant === 'h1',
          },
          { 'text-4xl md:text-5xl lg:text-6xl': variant === 'h2' },
          { 'text-3xl md:text-4xl lg:text-5xl': variant === 'h3' },
          { 'text-2xl md:text-3xl lg:text-4xl': variant === 'h4' },
        ),
        ref,
      },
      children,
    );
  },
);

TextWithShadow.displayName = 'TextWithShadow';

export default memo(TextWithShadow);
