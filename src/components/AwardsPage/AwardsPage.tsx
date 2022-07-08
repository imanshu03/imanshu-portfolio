import useIntersectionObserver from '@hooks/useIntersectionObserver';
import React, { useRef, useEffect, useMemo } from 'react';
import clsx from 'classnames';
import SectionHeading from '@common/SectionHeading';
import AwardBox from './AwardBox';
import useTimeline from '@hooks/useTimeline';

interface IProps {
  className?: string;
  pageData: {
    sectionHeadingText: string;
    sectionSubHeadingText: string;
    awardsData: Array<{
      type?: string;
      heading: string;
      date: string;
      issuer: string;
      description: string;
    }>;
  };
  version: 'theme1' | 'theme2';
}

const AwardsPage: React.FC<IProps> = (props) => {
  const {
    className,
    pageData: { sectionHeadingText, sectionSubHeadingText, awardsData },
  } = props;
  const wrapperRef = useRef(null);
  const entry = useIntersectionObserver(wrapperRef as any, {
    threshold: 0.5,
  });
  const isIntersecting = useMemo(() => entry?.isIntersecting, [entry]);
  const masterTimeline = useTimeline();

  useEffect(() => {
    if (!masterTimeline) return;
    if (isIntersecting) masterTimeline.play();
  }, [isIntersecting, masterTimeline]);

  return (
    <div ref={wrapperRef as any} className={clsx(className)}>
      <SectionHeading
        timeline={masterTimeline}
        heading={sectionHeadingText}
        subHeading={sectionSubHeadingText}
        variant="primary"
      />
      {awardsData && awardsData.length && (
        <div className="flex flex-row items-center justify-evenly flex-wrap my-10 md:my-12 lg:my-14">
          {awardsData.map((item, index) => (
            <AwardBox
              key={index}
              data={item}
              timeline={masterTimeline}
              index={index}
              isLast={index === awardsData.length - 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AwardsPage;
