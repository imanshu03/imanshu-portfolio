import React, { memo, useEffect, useRef, useState } from 'react';
import { Power2 } from 'gsap';
import Timeline from '@common/Timeline';
import * as CompanyLogos from '@assets/Company';
import Image from 'next/image';
import ShowLess from '@assets/ShowLess';
import useHeight from '@hooks/useHeight';
import clsx from 'classnames';
import { useMobileDevice } from '@hooks/useMobileDevice';

interface IProps {
  data: {
    company: string;
    icon?: string;
    startDate: string;
    endDate?: string;
    isPartTime?: boolean;
    designation: string;
    location: string;
    responsibilities?: string[];
  };
  isLast?: boolean;
  timeline: GSAPTimeline | null;
  index: number;
}

const ExperienceBox: React.FC<IProps> = (props) => {
  const {
    data: {
      company,
      icon,
      startDate,
      endDate,
      isPartTime,
      designation,
      location,
      responsibilities,
    },
    isLast,
    timeline,
    index,
  } = props;

  const boxRef = useRef(null);
  const timeRef = useRef(null);
  const listRef = useRef(null);
  const listHeight = useHeight(listRef);
  const isMobileDevice = useMobileDevice();

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
        top: 100,
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
      <div className="w-full pb-6 md:pb-8 lg:pb-10">
        <p
          className="hd-color p4-size lowercase italic !leading-[0.7rem]"
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
              <div className="h-[4.25rem] w-[4.25rem] md:h-[5rem] md:w-[5rem] drop-shadow-md mr-2 md:mr-4">
                <Image
                  src={(CompanyLogos as any)[icon]}
                  alt={icon}
                  loading="lazy"
                  className="h-full"
                />
              </div>
            )}
            <div className="flex flex-col items-start justify-between">
              <h4 className="p1-color hd4-size capitalize">{designation}</h4>
              <h5 className="p1-color hd5-size capitalize">
                {company},{' '}
                <span className="p3-size">
                  ({isPartTime ? 'Part-Time' : 'Full-Time'})
                </span>
              </h5>
              <p className="p1-color p3-size capitalize mt-[0.1rem]">
                {location}
              </p>
            </div>
          </div>
          {responsibilities && responsibilities.length > 0 && (
            <div className="mt-2 flex flex-col items-start">
              <button
                className="hd-color p4-size lowercase italic outline-none focus:outline-none mb-2 md:mb-3 lg:mb-4 cursor-none"
                onClick={onExpandToggle}
              >
                {isExpanded ? 'hide' : 'show'}
                &nbsp;responsibilities&nbsp;&nbsp;
                <ShowLess
                  className={clsx('inline w-3 h-3', {
                    'transition-[transform] ease-in-out duration-[400ms]':
                      !isMobileDevice,
                  })}
                  style={isExpanded ? {} : { transform: 'rotate(180deg)' }}
                />
              </button>
              <div
                className={clsx('overflow-hidden pl-4 box-border origin-top', {
                  'transition-[height] ease-in-out duration-[400ms]':
                    !isMobileDevice,
                })}
                style={
                  isExpanded
                    ? { height: `${listHeight + 10}px` }
                    : { height: '0px' }
                }
              >
                <ul
                  className="list-disc p2-color p3-size text-justify"
                  ref={listRef}
                >
                  {responsibilities.map((e, key) => (
                    <li key={key} className="mt-1 md:mt-2">
                      {e}
                    </li>
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
