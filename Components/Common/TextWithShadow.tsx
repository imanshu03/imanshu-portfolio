import React, { forwardRef } from 'react';

type VARIANT_TYPES = 'h1' | 'h2' | 'h3' | 'h4';

interface IProps {
  className: string;
  shadowClassName: string;
  children: React.ReactNode;
  variant?: VARIANT_TYPES;
}

const FONT_CLASS: { [key in VARIANT_TYPES]: string } = {
  h1: 'text-6xl md:text-7xl lg:text-8xl relative',
  h2: 'text-4xl md:text-5xl lg:text-6xl relative',
  h3: 'text-3xl md:text-4xl lg:text-5xl relative',
  h4: 'text-2xl md:text-3xl lg:text-4xl relative',
};

const generateClass: {
  [key in VARIANT_TYPES]: (colorClass: string, shadowClass: string) => string;
} = Object.keys(FONT_CLASS).reduce((acc: any, key: string) => {
  acc[key] = (colorClass: string, shadowClass: string) =>
    [(FONT_CLASS as any)[key], colorClass, shadowClass].join(' ');
  return acc;
}, {});

const TextWithShadow = forwardRef<React.MutableRefObject<any>, IProps>(
  (props, ref) => {
    const { variant = 'h1', className, shadowClassName, children } = props;

    const derivedClassName = generateClass[variant](className, shadowClassName);

    return React.createElement(
      variant,
      {
        className: derivedClassName,
        ref,
      },
      children,
    );
  },
);

TextWithShadow.displayName = 'TextWithShadow';

export default TextWithShadow;
