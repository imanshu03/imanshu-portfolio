import React, { useEffect, useRef } from 'react';
import { Power2 } from 'gsap';
import AwardIcon from '@assets/AwardFill';
import StarIcon from '@assets/StarIcon';
import Timeline from '@components/common/Timeline';

const icons = {
  award: AwardIcon,
  star: StarIcon,
};

interface IProps {
  data: {
    type?: string;
    heading: string;
    date: string;
    issuer: string;
    description: string;
  };
  timeline: GSAPTimeline | null;
  index: number;
  isLast: boolean;
}

const AwardBox: React.FC<IProps> = (props) => {
  const {
    data: { type, heading, date, issuer, description },
    timeline,
    index,
    isLast,
  } = props;
  const timeRef = useRef(null);
  const boxRef = useRef(null);

  useEffect(() => {
    if (!timeline) return;
    timeline.addLabel(`showBox_${index}`, (index + 1) * 0.4);
    timeline.fromTo(
      timeRef.current,
      {
        opacity: 0,
        ease: Power2.easeOut,
      },
      { opacity: 1 },
      `showBox_${index}`,
    );
    timeline.fromTo(
      boxRef.current,
      {
        opacity: 0,
        top: -100,
        ease: Power2.easeOut,
      },
      { opacity: 1, top: 0 },
      `showBox_${index}+=0.1`,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeline]);

  return (
    <div className="flex flex-row w-full h-[inherit]">
      <Timeline timeline={timeline} index={index} isLast={isLast} />
      <div className="w-full pb-6 md:pb-8 lg:pb-10">
        <p
          className="text-AteneoBlue dark:text-PastelPink text-[0.75rem] md:text-[0.875m] leading-[0.7rem] lowercase font-light italic"
          ref={timeRef}
        >
          {date}
        </p>
        <div
          className="flex flex-col items-start justify-start relative"
          ref={boxRef}
        >
          <div className="flex flex-row items-center justify-start w-full mt-4">
            <div className="h-[4.25rem] w-[4.25rem] md:h-[5rem] md:w-[5rem] drop-shadow-md mr-2 md:mr-4">
              {React.createElement((icons as any)[type ?? 'award'], {
                className: 'w-full h-full fill-AteneoBlue dark:fill-PastelPink',
              })}
            </div>
            <div className="flex flex-col items-start justify-between">
              <h4 className="text-GunMetal dark:text-EggShell text-lg md:text-xl capitalize">
                {heading}
              </h4>
              <p className="text-GunMetal dark:text-EggShell text-sm first-line:lg:text-base capitalize">
                {issuer}
              </p>
            </div>
          </div>
          <p className="text-justify mt-2 text-gray-500 dark:text-LanguidLavender text-xs md:text-sm lg:text-base font-light ">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AwardBox;
