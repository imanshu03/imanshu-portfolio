import React, { useEffect, useMemo, useRef, useState, memo } from 'react';
import useIntersectionObserver from '@hooks/useIntersectionObserver';
import useWidth from '@hooks/useWidth';
import SectionHeading from '@common/SectionHeading';
import SkillBox from './SkillBox';
import useTimeline from '@hooks/useTimeline';
import clsx from 'classnames';

interface IProps {
  className?: string;
  pageData: {
    sectionHeadingText: string;
    sectionSubHeadingText?: string;
    skillsData: Array<{ text: string; icon?: string }>;
  };
  version: 'theme1' | 'theme2';
}

const SkillsPage: React.FC<IProps> = (props) => {
  const {
    className,
    pageData: { sectionHeadingText, sectionSubHeadingText, skillsData },
  } = props;

  const scrollerWrapperRef = useRef<HTMLDivElement>(null);
  const masterTimeline = useTimeline({
    scrollTrigger: {
      trigger: '#skills',
      scrub: 1,
      start: 'top bottom',
      end: 'bottom bottom',
    },
  });

  useEffect(() => {
    if (!masterTimeline) return;
    masterTimeline.addLabel('content', 0.4);
    masterTimeline.fromTo(
      scrollerWrapperRef.current,
      {
        opacity: 0,
        top: 100,
      },
      {
        opacity: 1,
        top: 0,
      },
      'content',
    );
  }, [masterTimeline]);

  return (
    <div className={clsx(className, 'relative')} id="skills">
      <div className="pd-section">
        <SectionHeading
          heading={sectionHeadingText}
          subHeading={sectionSubHeadingText}
          timeline={masterTimeline}
          variant="secondary"
        />
        {skillsData.length > 0 && (
          <div
            className="w-full my-6 md:my-8 lg:my-10 cursor-pointer relative"
            ref={scrollerWrapperRef}
          >
            <div className="flex flex-row flex-wrap items-center justify-start">
              {skillsData.map((item) => (
                <SkillBox {...item} key={item.text} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(SkillsPage);
