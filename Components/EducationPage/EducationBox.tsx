import React, { useEffect, useRef, memo } from 'react';
import Timeline from '@common/Timeline';
import { Power2 } from 'gsap';

interface IProps {
  data: {
    startDate: string;
    endDate?: string;
    school: string;
    degree: string;
    stream?: string;
    location: string;
    score?: string;
  };
  isLast?: boolean;
  timeline: GSAPTimeline | null;
  index: number;
}

const ExperienceBox: React.FC<IProps> = (props) => {
  const {
    data: { startDate, endDate, location, school, degree, stream, score },
    isLast,
    timeline,
    index,
  } = props;

  const boxRef = useRef(null);
  const timeRef = useRef(null);

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
      <Timeline
        isLast={isLast}
        timeline={timeline}
        index={index}
        variant="secondary"
      />
      <div className="w-full pb-8 md:pb-10 lg:pb-12">
        <p
          className="hd-color p4-size !leading-[0.7rem] lowercase italic"
          ref={timeRef}
        >
          {startDate} - {endDate ?? 'Present'}
        </p>
        <div
          className="flex flex-col items-start justify-start relative"
          ref={boxRef}
        >
          <div className="flex flex-row items-center justify-start w-full mt-4">
            <div className="flex flex-col items-start justify-between">
              <h4 className="p1-color hd4-size capitalize">
                {degree}
                {stream && (
                  <span className="p3-size block sm:inline ml-0 sm:ml-2">
                    ({stream})
                  </span>
                )}
              </h4>
              <h5 className="p1-color hd5-size capitalize">{school}</h5>
              <p className="p1-color p3-size capitalize mt-[0.1rem] md:mt-0">
                {location}
              </p>
              {score && (
                <p className="p1-color p3-size capitalize mt-[0.1rem] md:mt-0">
                  {score}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ExperienceBox);
