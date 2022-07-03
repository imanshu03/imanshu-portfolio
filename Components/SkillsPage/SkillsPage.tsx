import React, { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import useWidth from '../../hooks/useWidth';
import SubText from '../Common/SubText';
import TextWithShadow from '../Common/TextWithShadow';
import SkillBox from './SkillBox';

const SKILLS: Array<{ text: string; icon: string | null }> = [
  { text: 'React.js', icon: 'ReactIcon' },
  { text: 'JavaScript', icon: 'JsIcon' },
  { text: 'TypeScript', icon: 'TsIcon' },
  { text: 'HTML5', icon: 'HtmlIcon' },
  { text: 'CSS3', icon: 'CssIcon' },
  { text: 'SCSS', icon: 'SassIcon' },
  { text: 'Redux.js', icon: 'ReduxIcon' },
  { text: 'Redux Saga', icon: 'SagaIcon' },
  { text: 'Express.js', icon: 'ExpressIcon' },
  { text: 'Node.js', icon: 'NodeIcon' },
  { text: 'Git', icon: 'GitIcon' },
  { text: 'Photoshop', icon: 'PsIcon' },
  { text: 'WebPack', icon: 'WebPackIcon' },
  { text: 'System Design', icon: null },
  { text: 'Data Structures & Algorithms', icon: null },
];

interface IProps {
  className: string;
}

const SkillsPage = forwardRef<React.RefObject<Element>, IProps>(
  function SkillsPage(props, wrapperRef) {
    const { className } = props;
    const scrollerRef = useRef<HTMLDivElement>(null);

    const { scrollWidth } = useWidth(scrollerRef);
    const [pauseScroll, setPauseScroll] = useState<boolean>(false);
    const entry = useIntersectionObserver(wrapperRef as any, {
      freezeOnceVisible: false,
      threshold: 1,
    });
    const isIntersecting = useMemo(() => {
      if (entry?.isIntersecting) return true;
      return false;
    }, [entry]);

    useEffect(() => {
      const head = document.head;
      const existingStyle = head.querySelector('#scroll-keyframes');
      if (existingStyle) head.removeChild(existingStyle);
      const style = document.createElement('style');
      style.setAttribute('id', 'scroll-keyframes');
      style.innerHTML = `
        @keyframes infinite-marquee {
          0% {
            left: 0;
          }
          100% {
            left: -${scrollWidth / 2}px;
          }
        }
      `;
      head.appendChild(style);
    }, [scrollWidth]);

    useEffect(() => {
      if (!scrollerRef.current) return;
      const target = scrollerRef.current;
      if (isIntersecting && !pauseScroll) {
        setTimeout(() => (target.style.animationPlayState = 'running'), 200);
      } else {
        target.style.animationPlayState = 'paused';
      }
      return () => {
        target.style.animationPlayState = 'paused';
      };
    }, [isIntersecting, pauseScroll]);

    const onScrollClick = (e: any) => {
      console.log(e);
      setPauseScroll(!pauseScroll);
    };

    return (
      <div
        className={`flex flex-col flex-nowrap h-auto w-full p-[0.8rem] pt-8 lg:pr-[1.2rem] box-border ${className}`}
        ref={wrapperRef as any}
      >
        <div className="w-full">
          <TextWithShadow
            className="text-LightRose dark:text-white tracking-widest"
            shadowClassName="ts-deep-ruby-2 md:ts-deep-ruby-3 lg:ts-deep-ruby-4 dark:ts-shadow-blue-2 dark:md:ts-shadow-blue-3 dark:lg:ts-shadow-blue-4"
          >
            skills
          </TextWithShadow>
          <SubText className="text-LightRose dark:text-white">
            values i can add to the organization
          </SubText>
        </div>
        <div className="w-full overflow-hidden my-4 cursor-pointer">
          <div className="flex relative animation-marquee" ref={scrollerRef}>
            <div
              className="flex flex-row flex-nowrap items-center justify-start"
              onClick={onScrollClick}
            >
              {SKILLS.map((item) => (
                <SkillBox {...item} key={item.text} />
              ))}
            </div>
            <div className="flex flex-row flex-nowrap items-center justify-start">
              {SKILLS.map((item) => (
                <SkillBox {...item} key={item.text} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  },
);

export default React.memo(SkillsPage);
