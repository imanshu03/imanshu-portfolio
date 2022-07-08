import React, { useEffect, useMemo, memo } from 'react';
import { useRef } from 'react';
import useTimeline from '@hooks/useTimeline';
import useIntersectionObserver from '@hooks/useIntersectionObserver';
import SectionHeading from '@common/SectionHeading';
import ExperienceBox from './ExperienceBox';
import clsx from 'classnames';

interface IProps {
  className?: string;
  pageData: {
    sectionHeadingText: string;
    sectionSubHeadingText?: string;
    experienceData: Array<{
      company: string;
      icon?: string;
      startDate: string;
      endDate?: string;
      isPartTime?: boolean;
      designation: string;
      location: string;
      responsibilities?: string[];
    }>;
  };
}

const ExperiencePage: React.FC<IProps> = (props) => {
  const {
    className,
    pageData: { sectionHeadingText, sectionSubHeadingText, experienceData },
  } = props;
  const wrapperRef = useRef(null);
  const masterTimeline = useTimeline();
  const entry = useIntersectionObserver(wrapperRef as any, {
    threshold: 0.5,
  });
  const isIntersecting = useMemo(() => entry?.isIntersecting, [entry]);

  useEffect(() => {
    if (!masterTimeline) return;
    if (isIntersecting) {
      masterTimeline.play();
    }
  }, [isIntersecting, masterTimeline]);

  return (
    <div className={clsx(className)} ref={wrapperRef as any}>
      <SectionHeading
        heading={sectionHeadingText}
        subHeading={sectionSubHeadingText}
        timeline={masterTimeline}
        variant="primary"
      />
      {experienceData && experienceData.length > 0 && (
        <div className="flex flex-col items-center justify-center my-10 md:my-12 lg:my-14">
          {experienceData.map((item, index) => (
            <ExperienceBox
              key={index}
              data={item}
              isLast={index === experienceData.length - 1}
              timeline={masterTimeline}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(ExperiencePage);
