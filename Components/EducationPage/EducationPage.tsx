import SectionHeading from '@components/common/SectionHeading';
import React, { forwardRef, memo, useMemo, useEffect } from 'react';
import details from './details.json';
import EducationBox from './EducationBox';
import clsx from 'classnames';
import useTimeline from '@hooks/useTimeline';
import useIntersectionObserver from '@hooks/useIntersectionObserver';

interface IProps {
  className: string;
}

const EducationPage = forwardRef<React.MutableRefObject<Element>, IProps>(
  function EducationPage(props, wrapperRef) {
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
      <div className={clsx(className)} ref={wrapperRef as any}>
        <SectionHeading
          variant="secondary"
          heading="education"
          subHeading="what i have studied"
          timeline={masterTimeline}
        />
        <div className="flex flex-col items-center justify-center my-10 md:my-12 lg:my-14">
          {details.education.map((item, index) => (
            <EducationBox
              key={index}
              data={item}
              isLast={index === details.education.length - 1}
              timeline={masterTimeline}
              index={index}
            />
          ))}
        </div>
      </div>
    );
  },
);

export default memo(EducationPage);
