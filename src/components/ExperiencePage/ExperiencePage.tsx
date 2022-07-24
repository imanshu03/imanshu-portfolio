import React, { memo } from 'react';
import useTimeline from '@hooks/useTimeline';
import SectionHeading from '@common/SectionHeading';
import ExperienceBox from './ExperienceBox';
import clsx from 'classnames';
import CurveWrapper from '@common/CurveWrapper';

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

  const masterTimeline = useTimeline({
    scrollTrigger: {
      trigger: '#experience',
      scrub: 1,
      start: 'top bottom',
      end: 'top top',
    },
  });

  return (
    <div className={clsx(className, 'relative')} id="experience">
      <div className="pd-section relative z-10">
        <SectionHeading
          heading={sectionHeadingText}
          subHeading={sectionSubHeadingText}
          timeline={masterTimeline}
          variant="primary"
        />
        {experienceData && experienceData.length > 0 && (
          <div className="flex flex-col items-center justify-center mt-10 md:mt-12 lg:mt-14">
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
      <CurveWrapper
        direction="down"
        variant="secondary"
        className="relative top-[1px]"
      />
    </div>
  );
};

export default memo(ExperiencePage);
