import React, { useEffect, useRef, memo } from 'react';
import TextWithShadow from '@common/TextWithShadow';
import { Power2 } from 'gsap';
import SubText from '@common/SubText';
import clsx from 'classnames';

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

  return (
    <div className="w-full">
      <TextWithShadow
        className={clsx(
          'w-full tracking-widest relative lowercase',
          {
            'text-AteneoBlue dark:text-PastelPink': variant === 'primary',
          },
          {
            'text-white dark:text-white': variant === 'secondary',
          },
        )}
        shadowClassName={clsx(
          {
            'ts-wild-blue-2 md:ts-wild-blue-3 lg:ts-wild-blue-4 dark:ts-deep-ruby-2 dark:md:ts-deep-ruby-3 dark:lg:ts-deep-ruby-4':
              variant === 'primary',
          },
          {
            'ts-shadow-blue-2 md:ts-shadow-blue-3 lg:ts-shadow-blue-4 dark:ts-shadow-blue-2 dark:md:ts-shadow-blue-3 dark:lg:ts-shadow-blue-4':
              variant === 'secondary',
          },
        )}
        ref={headingRef}
        variant="h2"
      >
        {heading}
      </TextWithShadow>
      {subHeading && (
        <SubText
          className={clsx(
            'lowercase relative',
            {
              'text-AteneoBlue dark:text-PastelPink': variant === 'primary',
            },
            {
              'text-white dark:text-white lowercase relative':
                variant === 'secondary',
            },
          )}
          ref={subHeadingRef}
        >
          {subHeading}
        </SubText>
      )}
    </div>
  );
};

export default memo(SectionHeading);
