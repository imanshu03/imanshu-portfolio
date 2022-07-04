import React, { memo, useEffect, useRef, useState } from 'react';
import { Power2 } from 'gsap';
import Timeline from './Timeline';
import * as CompanyLogos from '@assets/Company';
import Image from 'next/image';
import ShowLess from '@assets/ShowLess';
import useHeight from '@hooks/useHeight';

interface IProps {
  company: string;
  icon: string;
  startDate: string;
  endDate?: string;
  isPartTime?: boolean;
  designation: string;
  location: string;
  responsibilities?: string[];
  isLast?: boolean;
  timeline: GSAPTimeline | null;
  index: number;
}

const ExperienceBox: React.FC<IProps> = (props) => {
  const {
    company,
    icon,
    startDate,
    endDate,
    isPartTime,
    designation,
    location,
    responsibilities,
    isLast,
    timeline,
    index,
  } = props;

  const boxRef = useRef(null);
  const timeRef = useRef(null);
  const listRef = useRef(null);
  const listHeight = useHeight(listRef);

  const [isExpanded, setIsExpanded] = useState(false);

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

  const onExpandToggle = () => setIsExpanded((prev) => !prev);

  return (
    <div className="flex flex-row w-full h-[inherit]">
      <Timeline isLast={isLast} timeline={timeline} index={index} />
      <div className="w-full pb-10 md:pb-[3rem] lg:pb-[3.5rem]">
        <p
          className="text-AteneoBlue dark:text-PastelPink text-xs md:text-sm lowercase font-light italic relative"
          ref={timeRef}
        >
          {startDate} - {endDate ?? 'Present'}
        </p>
        <div
          className="flex flex-col items-start justify-start relative"
          ref={boxRef}
        >
          <div className="flex flex-row items-center justify-start w-full mt-4">
            {icon && (
              <div className="h-[4.25rem] w-[4.25rem] md:h-[5rem] md:w-[5rem] drop-shadow-md mr-2">
                <Image
                  src={(CompanyLogos as any)[icon]}
                  alt={icon}
                  loading="lazy"
                  className="h-full"
                />
              </div>
            )}
            <div className="flex flex-col items-start justify-between">
              <h4 className="text-GunMetal dark:text-white text-lg md:text-xl capitalize">
                {designation}
              </h4>
              <h5 className="text-GunMetal dark:text-white text-base md:text-lg capitalize">
                {company},{' '}
                <span className="text-xs md:text-sm lg:text-base font-light">
                  ({isPartTime ? 'Part-Time' : 'Full-Time'})
                </span>
              </h5>
              <p className="text-gray-500  dark:text-EggShell text-xs md:text-sm lg:text-base capitalize font-light mt-[0.1rem] md:mt-0">
                {location}
              </p>
            </div>
          </div>
          {responsibilities && responsibilities.length > 0 && (
            <div className="mt-4 flex flex-col items-start">
              <button
                className="text-AteneoBlue dark:text-PastelPink text-xs md:text-sm lowercase font-light italic outline-none focus:outline-none mb-2 md:mb-3 lg:mb-4"
                onClick={onExpandToggle}
              >
                {isExpanded ? 'show less' : 'show more'}
                &nbsp;&nbsp;
                <ShowLess
                  className="inline w-3 h-3 transition-[transform] ease-in-out duration-[400ms]"
                  style={isExpanded ? {} : { transform: 'rotate(180deg)' }}
                />
              </button>
              <div
                className="overflow-hidden pl-4 box-border origin-top transition-[height] ease-in-out duration-[400ms]"
                style={
                  isExpanded ? { height: `${listHeight}px` } : { height: '0px' }
                }
              >
                <ul
                  className="list-disc text-gray-500 dark:text-EggShell text-xs md:text-sm lg:text-base font-light text-justify"
                  ref={listRef}
                >
                  {responsibilities.map((e, key) => (
                    <li key={key}>{e}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(ExperienceBox);
