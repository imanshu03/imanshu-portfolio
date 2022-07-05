import { Power2 } from 'gsap';
import React, { useRef, useEffect, memo } from 'react';
import clsx from 'classnames';

interface IProps {
  isLast?: boolean;
  timeline: GSAPTimeline | null;
  index: number;
  variant?: 'primary' | 'secondary';
}

const Timeline: React.FC<IProps> = (props) => {
  const { isLast, timeline, index, variant = 'primary' } = props;
  const dotRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    if (timeline) {
      timeline.addLabel('showTimeline', (index + 1) * 0.4);
      timeline.fromTo(
        dotRef.current,
        {
          opacity: 0,
          ease: Power2.easeOut,
        },
        { opacity: 1 },
        'showTimeline',
      );
      if (lineRef.current) {
        timeline.fromTo(
          lineRef.current,
          {
            height: 0,
            ease: Power2.easeOut,
          },
          { height: 'calc(100% - 0.6rem)' },
          'showTimeline+=0.1',
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeline]);

  return (
    <div className="mr-2 md:mr-4 relative w-[2rem]">
      <div
        className={clsx(
          'w-[0.4rem] h-[0.4rem] bg-transparent border-2 absolute z-10 box-content rounded-[50%]',
          { 'border-AteneoBlue dark:border-PastelPink': variant === 'primary' },
          { 'border-white': variant === 'secondary' },
        )}
        ref={dotRef}
      />
      {!isLast && (
        <div
          className="w-[2px] bg-WildBlue dark:bg-DeepRuby absolute left-[0.28rem] top-[0.6rem] h-0"
          ref={lineRef}
        />
      )}
    </div>
  );
};

export default memo(Timeline);
