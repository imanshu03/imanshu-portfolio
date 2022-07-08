import React, { useEffect, useRef, memo } from 'react';
import TextWithShadow from './TextWithShadow';
import { Power2 } from 'gsap';
import SubText from './SubText';
import clsx from 'classnames';

type VARIANT_TYPE = 'primary' | 'secondary';

interface IProps {
  timeline: GSAPTimeline | null;
  heading: string;
  subHeading?: string;
  variant?: VARIANT_TYPE;
}

const SectionHeading: React.FC<IProps> = (props) => {
  const { timeline, heading, subHeading, variant = 'primary' } = props;
  const headingRef = useRef(null);
  const subHeadingRef = useRef(null);

  useEffect(() => {
    if (!timeline) return;
    timeline.addLabel('sectionHeadingText', 0);
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
      'sectionHeadingText',
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
        className={clsx('w-full tracking-widest lowercase hd-color')}
        shadowClassName={clsx('sh-shadow')}
        ref={headingRef}
        variant="h2"
      >
        {heading}
      </TextWithShadow>
      {subHeading && (
        <SubText
          className={clsx('lowercase relative mt-0 md:mt-1 lg:mt-2 hd-color')}
          ref={subHeadingRef}
        >
          {subHeading}
        </SubText>
      )}
    </div>
  );
};

export default memo(SectionHeading);
