import SectionHeading from '@common/SectionHeading';
import React, { memo } from 'react';
import EducationBox from './EducationBox';
import clsx from 'classnames';
import useTimeline from '@hooks/useTimeline';
import CurveWrapper from '@common/CurveWrapper';
import { useMobileDevice } from '@hooks/useMobileDevice';

interface IProps {
  className?: string;
  pageData: {
    sectionHeadingText: string;
    sectionSubHeadingText?: string;
    educationData: Array<{
      startDate: string;
      endDate?: string;
      school: string;
      degree: string;
      stream?: string;
      location: string;
      score?: string;
    }>;
  };
}

const EducationPage: React.FC<IProps> = (props) => {
  const {
    className,
    pageData: { sectionHeadingText, sectionSubHeadingText, educationData },
  } = props;

  const isMobileDevice = useMobileDevice();
  const masterTimeline = useTimeline({
    scrollTrigger: {
      trigger: '#education',
      scrub: 1,
      start: 'top bottom',
      end: 'bottom bottom',
    },
  });

  return (
    <div className={clsx(className)} id="education">
      <div className="pd-section md:px-[6rem] lg:px-[10rem] xl:px-[15rem] z-10">
        <SectionHeading
          variant="secondary"
          heading={sectionHeadingText}
          subHeading={sectionSubHeadingText}
          timeline={masterTimeline}
        />
        {educationData && educationData.length > 0 && (
          <div className="flex flex-col items-center justify-center mt-10 md:mt-12 lg:mt-14">
            {educationData.map((item, index) => (
              <EducationBox
                key={index}
                data={item}
                isLast={index === educationData.length - 1}
                timeline={masterTimeline}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
      {!isMobileDevice ? (
        <CurveWrapper direction="up" shadowDirection="up" invert />
      ) : null}
    </div>
  );
};

export default memo(EducationPage);
