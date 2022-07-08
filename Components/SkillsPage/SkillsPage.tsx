import React, {
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState,
  memo,
} from 'react';
import useIntersectionObserver from '@hooks/useIntersectionObserver';
import useWidth from '@hooks/useWidth';
import SectionHeading from '@common/SectionHeading';
import SkillBox from './SkillBox';
import useTimeline from '@hooks/useTimeline';
import clsx from 'classnames';

interface IProps {
  className?: string;
  pageData: {
    sectionHeadingText: string;
    sectionSubHeadingText?: string;
    skillsData: Array<{ text: string; icon?: string }>;
  };
}

const SkillsPage: React.FC<IProps> = (props) => {
  const {
    className,
    pageData: { sectionHeadingText, sectionSubHeadingText, skillsData },
  } = props;
  const wrapperRef = useRef(null);

  const scrollerWrapperRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const { scrollWidth } = useWidth(scrollerRef);
  const [pauseScroll, setPauseScroll] = useState<boolean>(true);
  const masterTimeline = useTimeline();
  const entry = useIntersectionObserver(wrapperRef as any, {
    threshold: 1,
  });
  const isIntersecting = useMemo(() => entry?.isIntersecting, [entry]);

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
        @-webkit-keyframes infinite-marquee {
          0% {
            left: 0;
          }
          100% {
            left: -${scrollWidth / 2}px;
          }
        }
        @-moz-keyframes infinite-marquee {
          0% {
            left: 0;
          }
          100% {
            left: -${scrollWidth / 2}px;
          }
        }
        @-ms-keyframes infinite-marquee {
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

  useEffect(() => {
    if (!masterTimeline) return;
    masterTimeline.addLabel('content', 0.4);
    masterTimeline.fromTo(
      scrollerWrapperRef.current,
      {
        opacity: 0,
        top: -100,
      },
      {
        opacity: 1,
        top: 0,
        onComplete: () => setPauseScroll(false),
      },
      'content',
    );
  }, [masterTimeline]);

  useEffect(() => {
    if (!masterTimeline) return;
    if (isIntersecting) masterTimeline?.play();
  }, [isIntersecting, masterTimeline]);

  const onScrollClick = (e: any) => {
    setPauseScroll((prev) => !prev);
  };

  return (
    <div className={clsx(className)} ref={wrapperRef as any}>
      <SectionHeading
        heading={sectionHeadingText}
        subHeading={sectionSubHeadingText}
        timeline={masterTimeline}
        variant="secondary"
      />
      {skillsData.length > 0 && (
        <div
          className="w-full overflow-hidden my-6 md:my-8 lg:my-10 cursor-pointer relative"
          ref={scrollerWrapperRef}
        >
          <div className="flex relative animation-marquee" ref={scrollerRef}>
            <div
              className="flex flex-row flex-nowrap items-center justify-start"
              onClick={onScrollClick}
            >
              {skillsData.map((item) => (
                <SkillBox {...item} key={item.text} />
              ))}
            </div>
            <div className="flex flex-row flex-nowrap items-center justify-start">
              {skillsData.map((item) => (
                <SkillBox {...item} key={item.text} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(SkillsPage);
