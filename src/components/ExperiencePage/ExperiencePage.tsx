import React, { memo } from 'react';
import useTimeline from '@hooks/useTimeline';
import SectionHeading from '@common/SectionHeading';
import ExperienceBox from './ExperienceBox';
import clsx from 'classnames';
import CurveWrapper from '@common/CurveWrapper';
import { useMobileDevice } from '@hooks/useMobileDevice';

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

  const isMobileDevice = useMobileDevice();
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
      <div className="pd-section relative z-10 md:px-[6rem] lg:px-[10rem] xl:px-[15rem]">
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
      {!isMobileDevice ? (
        <CurveWrapper
          direction="down"
          variant="secondary"
          className="relative top-[1px]"
        />
      ) : null}
    </div>
  );
};

export default memo(ExperiencePage);
