import React, { forwardRef } from 'react';

type VARIANT_TYPES = 'heading' | 'sectionHeading';

interface IProps {
  variant?: VARIANT_TYPES;
  className: string;
  shadowClassName: string;
  children: React.ReactNode;
}

const FONT_CLASS: { [key in VARIANT_TYPES]: string } = {
  heading: 'text-6xl md:text-7xl lg:text-8xl relative',
  sectionHeading: 'text-4xl md:text-5xl lg:text-6xl relative',
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
    const {
      variant = 'sectionHeading',
      className,
      shadowClassName,
      children,
    } = props;

    const elementTag = variant === 'sectionHeading' ? 'h2' : 'h1';
    const derivedClassName = generateClass[variant](className, shadowClassName);

    return React.createElement(
      elementTag,
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
