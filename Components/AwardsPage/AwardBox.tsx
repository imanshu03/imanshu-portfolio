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
    icon?: string;
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
    data: { icon, heading, date, issuer, description },
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
          className="hd-color p4-size !leading-[0.7rem] lowercase italic"
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
              {React.createElement((icons as any)[icon ?? 'award'], {
                className: 'w-full h-full icon-fill',
              })}
            </div>
            <div className="flex flex-col items-start justify-between">
              <h4 className="p1-color hd4-size capitalize">{heading}</h4>
              <p className="p1-color p2-size capitalize">{issuer}</p>
            </div>
          </div>
          <p className="text-justify mt-2 p2-color p3-size">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default AwardBox;
