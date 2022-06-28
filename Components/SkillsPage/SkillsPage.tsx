import gsap, { Power2 } from 'gsap';
import React, { forwardRef, useEffect, useRef } from 'react';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import SubText from '../Common/SubText';
import TextWithShadow from '../Common/TextWithShadow';
import * as Icons from '../../Assets/Skills';

const SKILLS = [
  { text: 'React.js', icon: 'ReactIcon' },
  { text: 'JavaScript ES6+', icon: 'JsIcon' },
  { text: 'TypeScript', icon: 'TsIcon' },
  { text: 'HTML5', icon: 'HtmlIcon' },
  { text: 'CSS3', icon: 'CssIcon' },
  { text: 'SCSS', icon: 'SassIcon' },
  { text: 'Redux.js', icon: 'ReduxIcon' },
  { text: 'Redux Saga', icon: 'SagaIcon' },
  { text: 'Express.js', icon: 'ExpressIcon' },
  { text: 'Node.js', icon: 'NodeIcon' },
  { text: 'Git', icon: 'GitIcon' },
  { text: 'Adobe Photoshop', icon: 'PsIcon' },
  { text: 'WebPack', icon: 'WebPackIcon' },
  { text: 'System Design', icon: null },
  { text: 'Data Structures & Algorithms', icon: null },
];

const SkillsPage = forwardRef<React.RefObject<Element>, {}>(
  (_props, wrapperRef) => {
    const sectionHeadRef = useRef(null);
    const subHeadRef = useRef(null);

    const entry = useIntersectionObserver(
      wrapperRef as React.RefObject<Element>,
      {},
    );

    // Master timeline
    useEffect(() => {
      if (entry?.isIntersecting) {
        const masterTl = gsap.timeline();
        masterTl.fromTo(
          sectionHeadRef.current,
          { opacity: 0, top: 100, ease: Power2.easeOut },
          { opacity: 1, top: 0 },
        );
        masterTl.fromTo(
          subHeadRef.current,
          { opacity: 0, top: 100, ease: Power2.easeOut },
          { opacity: 1, top: 0 },
          '>-0.2',
        );
      }
    }, [entry]);

    return (
      <div
        className="flex flex-col flex-nowrap h-auto w-[100vw] p-[0.8rem] pt-8 lg:pr-[1.2rem] box-border"
        ref={wrapperRef as any}
      >
        <div className="w-full">
          <TextWithShadow
            className="text-ChinaRose dark:text-PastelPink opacity-0 top-[100] tracking-widest"
            shadowClassName="ts-purple-taupe-2 dark:ts-deep-ruby-2"
            ref={sectionHeadRef}
          >
            skills
          </TextWithShadow>
          <SubText
            className="text-ChinaRose dark:text-PastelPink opacity-0 top-[100]"
            ref={subHeadRef}
          >
            values i can add to the organization
          </SubText>
        </div>
        <div className="flex flex-row flex-wrap items-center justify-evenly w-full mt-8">
          {SKILLS.map((item, key) => (
            <div
              className={`w-[7rem] h-[7rem] lg:w-[11rem] lg:h-[11rem] flex flex-col flex-nowrap items-center justify-center m-3 lg:m-6 drop-shadow-lg p-[0.6rem] lg:p-[1.2rem] ${
                !item.icon ? 'bg-gray-50/10' : ''
              }`}
              key={key}
            >
              {item.icon &&
                React.createElement((Icons as any)[item.icon as any], {
                  className:
                    'w-[4.5rem] h-[4.5rem] lg:w-[7rem] lg:h-[7rem] mb-2',
                })}
              <span className="text-PurpleTaupe dark:text-EggShell text-xs md:text-sm lg:text-base text-center">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  },
);

SkillsPage.displayName = 'SkillsPage';

export default SkillsPage;
