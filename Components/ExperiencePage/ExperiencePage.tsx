import React, { useEffect, useMemo } from 'react';
import { forwardRef } from 'react';
import TextWithShadow from '../Common/TextWithShadow';
import SubText from '../Common/SubText';
import useTimeline from '../../hooks/useTimeline';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import SectionHeading from '../Common/SectionHeading';

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
      <div
        className={`flex flex-col flex-nowrap h-[100vh] md:h-[100vh] w-full p-[0.8rem] pt-8 lg:pr-[1.2rem] box-border ${className}`}
        ref={wrapperRef as any}
      >
        <SectionHeading
          heading="experience"
          subHeading="i love what i do"
          timeline={masterTimeline}
          variant="primary"
        />
      </div>
    );
  },
);

export default React.memo(ExperiencePage);
