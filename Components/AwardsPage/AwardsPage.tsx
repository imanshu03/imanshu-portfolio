import useIntersectionObserver from '@hooks/useIntersectionObserver';
import React, { forwardRef, useEffect, useMemo } from 'react';
import clsx from 'classnames';
import SectionHeading from '@components/common/SectionHeading';
import details from './details.json';
import AwardBox from './AwardBox';
import useTimeline from '@hooks/useTimeline';

interface IProps {
  className: string;
}

const AwardsPage = forwardRef<React.MutableRefObject<Element>, IProps>(
  function AwardsPage(props, wrapperRef) {
    const { className } = props;
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
          heading="awards"
          subHeading="what i have achieved"
          variant="primary"
        />
        <div className="flex flex-row items-center justify-evenly flex-wrap my-10 md:my-12 lg:my-14">
          {details.achievements.map((item, index) => (
            <AwardBox
              key={index}
              data={item}
              timeline={masterTimeline}
              index={index}
              isLast={index === details.achievements.length - 1}
            />
          ))}
        </div>
      </div>
    );
  },
);

export default AwardsPage;
