import SectionHeading from '@components/common/SectionHeading';
import React, { useRef, memo, useMemo, useEffect } from 'react';
import EducationBox from './EducationBox';
import clsx from 'classnames';
import useTimeline from '@hooks/useTimeline';
import useIntersectionObserver from '@hooks/useIntersectionObserver';

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
  version: 'theme1' | 'theme2';
}

const EducationPage: React.FC<IProps> = (props) => {
  const {
    className,
    pageData: { sectionHeadingText, sectionSubHeadingText, educationData },
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
        variant="secondary"
        heading={sectionHeadingText}
        subHeading={sectionSubHeadingText}
        timeline={masterTimeline}
      />
      {educationData && educationData.length > 0 && (
        <div className="flex flex-col items-center justify-center my-10 md:my-12 lg:my-14">
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
  );
};

export default memo(EducationPage);
