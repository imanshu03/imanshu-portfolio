import React, { useEffect, useRef, memo } from 'react';
import TextWithShadow from './TextWithShadow';
import { Power2 } from 'gsap';
import SubText from './SubText';

type VARIANT_TYPE = 'primary' | 'secondary';

interface IProps {
  timeline: GSAPTimeline | null;
  heading: string;
  subHeading?: string;
  variant: VARIANT_TYPE;
}

const SectionHeading: React.FC<IProps> = (props) => {
  const { timeline, heading, subHeading, variant } = props;
  const headingRef = useRef(null);
  const subHeadingRef = useRef(null);

  useEffect(() => {
    if (!timeline) return;
    timeline.addLabel('sectionHeading', 0);
    timeline.fromTo(
      headingRef.current,
      {
        top: 100,
        opacity: 0,
        ease: Power2.easeOut,
      },
      {
        top: 0,
        opacity: 1,
      },
      'sectionHeading',
    );
    timeline.fromTo(
      subHeadingRef.current,
      {
        top: 100,
        opacity: 0,
        ease: Power2.easeOut,
      },
      {
        top: 0,
        opacity: 1,
      },
      '>-0.2',
    );
  }, [timeline]);

  const headingClass: {
    [key: string]: {
      className: string;
      shadowClassName: string;
    };
  } = {
    secondary: {
      className:
        'text-LightRose dark:text-white tracking-widest relative lowercase',
      shadowClassName:
        'ts-deep-ruby-2 md:ts-deep-ruby-3 lg:ts-deep-ruby-4 dark:ts-shadow-blue-2 dark:md:ts-shadow-blue-3 dark:lg:ts-shadow-blue-4',
    },
    primary: {
      className:
        'text-YellowRed dark:text-PastelPink w-full tracking-widest lowercase',
      shadowClassName:
        'ts-china-rose-2 md:ts-china-rose-3 lg:ts-china-rose-4 dark:ts-deep-ruby-2 dark:md:ts-deep-ruby-3 dark:lg:ts-deep-ruby-4',
    },
  };

  const subHeadingClass: { [key: string]: string } = {
    primary: 'text-YellowRed dark:text-PastelPink lowercase',
    secondary: 'text-LightRose dark:text-white lowercase relative',
  };

  return (
    <div className="w-full">
      <TextWithShadow
        className={headingClass[variant].className}
        shadowClassName={headingClass[variant].shadowClassName}
        ref={headingRef}
      >
        {heading}
      </TextWithShadow>
      {subHeading && (
        <SubText className={subHeadingClass[variant]} ref={subHeadingRef}>
          {subHeading}
        </SubText>
      )}
    </div>
  );
};

export default memo(SectionHeading);
