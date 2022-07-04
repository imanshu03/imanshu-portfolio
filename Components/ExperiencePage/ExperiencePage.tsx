import React, { useEffect, useMemo, memo } from 'react';
import { forwardRef } from 'react';
import useTimeline from '@hooks/useTimeline';
import useIntersectionObserver from '@hooks/useIntersectionObserver';
import SectionHeading from '@common/SectionHeading';
import details from './details.json';
import ExperienceBox from './ExperienceBox';

interface IProps {
  className: string;
}

const ExperiencePage = forwardRef<React.RefObject<Element>, IProps>(
  function ExperiencePage(props, wrapperRef) {
    const { className } = props;
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
      <div className={`${className}`} ref={wrapperRef as any}>
        <SectionHeading
          heading="experience"
          subHeading="i love what i do"
          timeline={masterTimeline}
          variant="primary"
        />
        <div className="flex flex-col items-center justify-center my-6 md:my-8 lg:my-10">
          {details.workExperience.map((item, index) => (
            <ExperienceBox
              key={index}
              data={item}
              isLast={index === details.workExperience.length - 1}
              timeline={masterTimeline}
              index={index}
            />
          ))}
        </div>
      </div>
    );
  },
);

export default memo(ExperiencePage);
