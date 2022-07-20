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
  const masterTimeline = useTimeline({
    scrollTrigger: {
      trigger: '#awards',
      scrub: 1,
      start: 'top bottom',
      end: 'bottom bottom',
    },
  });

  return (
    <div id="awards" className={clsx(className)}>
      <div className="pd-section">
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
    </div>
  );
};

export default AwardsPage;
