import React from 'react';
import clsx from 'classnames';
import SectionHeading from '@common/SectionHeading';
import AwardBox from './AwardBox';
import useTimeline from '@hooks/useTimeline';
import CurveWrapper from '@common/CurveWrapper';
import { useMobileDevice } from '@hooks/useMobileDevice';

interface IProps {
  className?: string;
  pageData: {
    sectionHeadingText: string;
    sectionSubHeadingText?: string;
    awardsData: Array<{
      type?: string;
      heading: string;
      date: string;
      issuer: string;
      description: string;
    }>;
  };
}

const AwardsPage: React.FC<IProps> = (props) => {
  const {
    className,
    pageData: { sectionHeadingText, sectionSubHeadingText, awardsData },
  } = props;

  const isMobileDevice = useMobileDevice();
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
      <div className="pd-section md:px-[6rem] lg:px-[10rem] xl:px-[15rem]">
        <SectionHeading
          timeline={masterTimeline}
          heading={sectionHeadingText}
          subHeading={sectionSubHeadingText}
          variant="primary"
        />
        {awardsData && awardsData.length && (
          <div className="flex flex-row items-center justify-evenly flex-wrap mt-10 md:my-12 lg:my-14">
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
      {!isMobileDevice ? (
        <CurveWrapper
          direction="down"
          variant="secondary"
          className="relative top-[1px]"
          invert
        />
      ) : null}
    </div>
  );
};

export default AwardsPage;
