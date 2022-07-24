import React, { useEffect, useRef, memo } from 'react';
import SectionHeading from '@common/SectionHeading';
import SkillBox from './SkillBox';
import useTimeline from '@hooks/useTimeline';
import clsx from 'classnames';
import CurveWrapper from '@common/CurveWrapper';

interface IProps {
  className?: string;
  pageData: {
    sectionHeadingText: string;
    sectionSubHeadingText?: string;
    skillsData: {
      [key: string]: Array<{ text: string; icon?: string }>;
    };
  };
}

const snakeToSpacedString = (str: string) =>
  str.replace(/[A-Z]/g, (e) => ` ${e.toLowerCase()}`);

const SkillsPage: React.FC<IProps> = (props) => {
  const {
    className,
    pageData: { sectionHeadingText, sectionSubHeadingText, skillsData },
  } = props;

  const skillWrapperRef = useRef<Array<any>>(
    Array(Object.keys(skillsData).length).fill(null),
  );
  const masterTimeline = useTimeline({
    scrollTrigger: {
      trigger: '#skills',
      scrub: 1,
      start: 'top bottom',
      end: 'bottom bottom',
    },
  });

  useEffect(() => {
    if (!masterTimeline && !skillWrapperRef.current.every((e) => e)) return;
    skillWrapperRef.current.forEach((item, index) => {
      masterTimeline?.addLabel(`content_${index}`, 0.4 * (index + 1));
      masterTimeline?.fromTo(
        item,
        {
          opacity: 0,
          top: 100,
        },
        {
          opacity: 1,
          top: 0,
        },
        `content_${index}`,
      );
    });
  }, [masterTimeline, skillWrapperRef]);

  return (
    <div className={clsx(className, 'relative')} id="skills">
      <div className="pd-section">
        <SectionHeading
          heading={sectionHeadingText}
          subHeading={sectionSubHeadingText}
          timeline={masterTimeline}
          variant="secondary"
        />
        <div className="mt-10 md:mt-12 lg:mt-14 flex flex-row flex-wrap items-center justify-start">
          {Object.keys(skillsData).map((heading, index) => (
            <div
              className="mb-2 py-2 w-full sm:w-auto sm:pr-6 relative"
              key={heading}
              ref={(e) => (skillWrapperRef.current[index] = e)}
            >
              <p className="p1-color p3-size tracking-wide">
                {snakeToSpacedString(heading)}
              </p>
              <div className="flex flex-row flex-wrap items-center justify-start">
                {skillsData[heading].map((item) => (
                  <SkillBox {...item} key={item.text} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <CurveWrapper
        direction="up"
        shadowDirection="up"
        variant="secondary"
        invert
      />
    </div>
  );
};

export default memo(SkillsPage);
