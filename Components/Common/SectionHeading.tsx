import React, { useEffect, useRef, memo } from 'react';
import TextWithShadow from '@common/TextWithShadow';
import { Power2 } from 'gsap';
import SubText from '@common/SubText';

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
      '>-0.4',
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
        'text-white dark:text-white w-full tracking-widest relative lowercase',
      shadowClassName:
        'ts-shadow-blue-2 md:ts-shadow-blue-3 lg:ts-shadow-blue-4 dark:ts-shadow-blue-2 dark:md:ts-shadow-blue-3 dark:lg:ts-shadow-blue-4',
    },
    primary: {
      className:
        'text-AteneoBlue dark:text-PastelPink w-full tracking-widest lowercase',
      shadowClassName:
        'ts-wild-blue-2 md:ts-wild-blue-3 lg:ts-wild-blue-4 dark:ts-deep-ruby-2 dark:md:ts-deep-ruby-3 dark:lg:ts-deep-ruby-4',
    },
  };

  const subHeadingClass: { [key: string]: string } = {
    primary: 'text-AteneoBlue dark:text-PastelPink lowercase relative',
    secondary: 'text-white dark:text-white lowercase relative',
  };

  return (
    <div className="w-full">
      <TextWithShadow
        className={headingClass[variant].className}
        shadowClassName={headingClass[variant].shadowClassName}
        ref={headingRef}
        variant="h2"
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
