import React, {
  forwardRef,
  LegacyRef,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Power2 } from 'gsap';
import TextWithShadow from '../Common/TextWithShadow';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import useTimeline from '../../hooks/useTimeline';

const description = [
  'I have more than 2.5 years of experience in software development. I believe in developing modern, reactive and user friendly web applications using the latest technologies.',
  'I believe a perfect blend of software design is one, where the goals and needs are accounted for in an elegant, efficient and robust design of the software.',
  'If I am not working then there is a high chance that I am busy potting pool balls with my cue or leading my player for a Winner Winner Chicken Dinner!',
  'Scroll down to know more about me!',
];

const NAME = [
  { first: 'imanshu', last: 'rathore' },
  { first: 'इमांशु', last: 'राठौड़' },
  { first: 'ਇਮਾਂਸ਼ੂ', last: 'ਰਾਠੌਰ' },
];

interface IProps {
  className: string;
}

const AboutPage = forwardRef<React.RefObject<Element>, IProps>(
  function AboutPage(props, wrapperRef) {
    const { className } = props;
    const entry = useIntersectionObserver(
      wrapperRef as React.RefObject<Element>,
      { threshold: 1.0 },
    );
    const isIntersecting = useMemo(() => entry?.isIntersecting, [entry]);

    const masterTimeline = useTimeline();
    const nameAnimTimeline = useTimeline({ repeat: -1 }, false);

    const [nameAnimState, setNameAnimState] = useState<{
      index: number;
      pause: boolean;
    }>({
      index: 0,
      pause: false,
    });
    const cycle = useRef<number>(0);

    const greetAnimRef = useRef(null);
    const firstNameAnimRef = useRef(null);
    const lastNameAnimRef = useRef(null);
    const tagLineAnimRef = useRef(null);
    const introAnimRef = useRef(null);

    // adding tweens to timelines
    useEffect(() => {
      if (!masterTimeline && !nameAnimTimeline) return;
      masterTimeline?.addLabel('greetRef', 0);
      masterTimeline?.addLabel('nameRef', 0.2);
      masterTimeline?.addLabel('taglineRef', 0.8);
      masterTimeline?.addLabel('introRef', 1);

      masterTimeline?.fromTo(
        greetAnimRef.current,
        { left: 50, opacity: 0, ease: Power2.easeOut },
        { left: 0, opacity: 1 },
        'greetRef',
      );
      masterTimeline?.fromTo(
        tagLineAnimRef.current,
        { opacity: 0, left: -50, ease: Power2.easeOut },
        { opacity: 1, left: 0 },
        'taglineRef',
      );
      masterTimeline?.fromTo(
        introAnimRef.current,
        { opacity: 0, ease: Power2.easeOut },
        { opacity: 1 },
        'introRef',
      );

      nameAnimTimeline?.fromTo(
        firstNameAnimRef.current,
        { opacity: 0, top: 100, ease: Power2.easeOut },
        { opacity: 1, top: 0 },
        '0.1',
      );
      nameAnimTimeline?.fromTo(
        lastNameAnimRef.current,
        { opacity: 0, top: 100, ease: Power2.easeOut },
        {
          opacity: 1,
          top: 0,
          onComplete: () => {
            setNameAnimState((prevState) => {
              let { pause } = prevState;
              if (cycle.current) pause = !pause;
              return { ...prevState, pause };
            });
          },
        },
        '>-0.2',
      );
      nameAnimTimeline?.to(
        firstNameAnimRef.current,
        { opacity: 0, top: -100, ease: Power2.easeIn },
        '>+3',
      );
      nameAnimTimeline?.to(
        lastNameAnimRef.current,
        {
          opacity: 0,
          top: -100,
          ease: Power2.easeIn,
          onComplete: () => {
            setNameAnimState((prevState) => {
              let { index } = prevState;
              if (index + 1 === NAME.length) cycle.current += 1;
              index = (index + 1) % NAME.length;
              return { ...prevState, index };
            });
          },
        },
        '>-0.2',
      );

      masterTimeline?.add(nameAnimTimeline as GSAPTimeline, 'nameRef');
    }, [masterTimeline, nameAnimTimeline]);

    // play master timeline on view
    useEffect(() => {
      if (!masterTimeline) return;
      if (isIntersecting) masterTimeline.play();
    }, [isIntersecting, masterTimeline]);

    // pause name timeline on 1 repition
    useEffect(() => {
      if (!nameAnimTimeline) return;
      if (nameAnimState.pause) nameAnimTimeline.pause(nameAnimTimeline.time());
    }, [nameAnimState, nameAnimTimeline]);

    return (
      <div
        className={`flex flex-col flex-nowrap h-[100vh] w-full p-[0.8rem] pt-8 lg:pr-[1.2rem] box-border ${className}`}
        ref={wrapperRef as LegacyRef<HTMLDivElement>}
      >
        {/* Image and Name */}
        <div className="w-full h-min flex flex-col items-center md:flex-row md:justify-center">
          <div className="h-full w-full flex flex-col items-start justify-center order-2 lg:w-[60%] md:order-1">
            <p
              className="text-YellowRed dark:text-PastelPink text-2xl md:text-3xl lg:text-4xl relative"
              ref={greetAnimRef}
            >
              hi, i am
            </p>
            <div className="flex flex-col flex-wrap items-start justify-center">
              <TextWithShadow
                variant="heading"
                className="text-YellowRed dark:text-PastelPink w-full tracking-wide"
                shadowClassName="ts-china-rose-3 md:ts-china-rose-5 lg:ts-china-rose-5 dark:ts-deep-ruby-3 dark:md:ts-deep-ruby-4 dark:lg:ts-deep-ruby-5"
                ref={firstNameAnimRef}
              >
                {NAME[nameAnimState.index].first}
              </TextWithShadow>
              <TextWithShadow
                variant="heading"
                className="text-YellowRed dark:text-PastelPink w-full mt-[0.2rem] tracking-wide"
                shadowClassName="ts-china-rose-3 md:ts-china-rose-5 lg:ts-china-rose-5 dark:ts-deep-ruby-3 dark:md:ts-deep-ruby-4 dark:lg:ts-deep-ruby-5"
                ref={lastNameAnimRef}
              >
                {NAME[nameAnimState.index].last}
              </TextWithShadow>
            </div>
            <p
              className="text-YellowRed dark:text-PastelPink relative text-2xl md:text-3xl lg:text-4xl"
              ref={tagLineAnimRef}
            >
              a frontend engineer
            </p>
          </div>
          <div className="h-full w-min order-1 lg:w-[40%] md:order-2"></div>
        </div>

        {/* Intro Line */}
        <p className="text-justify" ref={introAnimRef}>
          {description.map((text, idx) => (
            <span
              key={idx}
              className="text-PurpleTaupe dark:text-EggShell text-base md:text-lg lg:text-xl relative mt-[0.2rem] md:mt-[0.6rem] lg:mt-[1rem] block font-light"
            >
              {text}
            </span>
          ))}
        </p>
      </div>
    );
  },
);

export default React.memo(AboutPage);
