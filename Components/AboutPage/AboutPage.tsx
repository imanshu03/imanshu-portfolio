import React, {
  forwardRef,
  LegacyRef,
  useEffect,
  useRef,
  useState,
} from 'react';
import { gsap, Power2 } from 'gsap';
import TextWithShadow from '../Common/TextWithShadow';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

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

const AboutPage = forwardRef<React.RefObject<Element>, {}>(function AboutPage(
  _props,
  wrapperRef,
) {
  const entry = useIntersectionObserver(
    wrapperRef as React.RefObject<Element>,
    {},
  );

  const [nameIdx, setNameIdx] = useState<number>(0);
  const [triggerStaticAnim, setTriggerStaticAnim] = useState<boolean>(false);

  const greetAnimRef = useRef(null);
  const firstNameAnimRef = useRef(null);
  const lastNameAnimRef = useRef(null);
  const tagLineAnimRef = useRef(null);
  const introAnimRef = useRef<(HTMLSpanElement | null)[]>(
    description.map(() => null),
  );

  // Master Timeline
  useEffect(() => {
    if (entry?.isIntersecting) {
      const masterTl = gsap.timeline();
      masterTl.fromTo(
        greetAnimRef.current,
        { left: 50, opacity: 0, ease: Power2.easeOut },
        { left: 0, opacity: 1 },
      );

      masterTl.fromTo(
        tagLineAnimRef.current,
        { opacity: 0, left: -50, ease: Power2.easeOut },
        { opacity: 1, left: 0 },
        '>+0.4',
      );

      // Intro Timeline
      const introTl = gsap.timeline();
      introAnimRef.current.map((ref) => {
        introTl.fromTo(
          ref,
          {
            opacity: 0,
            top: -100,
          },
          {
            opacity: 1,
            top: 0,
          },
          '<0.1',
        );
      });
      masterTl.add(introTl, '>-0.2');
    }
  }, [entry]);

  // Looped Name timeline
  useEffect(() => {
    if (entry?.isIntersecting) {
      const nameTl = gsap.timeline({ repeat: NAME.length - 1 });
      nameTl.fromTo(
        firstNameAnimRef.current,
        { opacity: 0, top: 100, ease: Power2.easeOut },
        { opacity: 1, top: 0 },
        '0.1',
      );
      nameTl.fromTo(
        lastNameAnimRef.current,
        { opacity: 0, top: 100, ease: Power2.easeOut },
        { opacity: 1, top: 0 },
        '>-0.2',
      );
      nameTl.to(
        firstNameAnimRef.current,
        { opacity: 0, top: -100, ease: Power2.easeIn },
        '>+3',
      );
      nameTl.to(
        lastNameAnimRef.current,
        {
          opacity: 0,
          top: -100,
          ease: Power2.easeIn,
          onComplete: () => {
            setNameIdx((prev) => {
              setTriggerStaticAnim(prev + 1 === NAME.length);
              return (prev + 1) % NAME.length;
            });
          },
        },
        '>-0.2',
      );
    }
  }, [entry]);

  // Static Name Timeline
  useEffect(() => {
    if (triggerStaticAnim && entry?.isIntersecting) {
      const nameTl = gsap.timeline();
      nameTl.fromTo(
        firstNameAnimRef.current,
        { opacity: 0, top: 100, ease: Power2.easeOut },
        { opacity: 1, top: 0 },
        '0.2',
      );
      nameTl.fromTo(
        lastNameAnimRef.current,
        { opacity: 0, top: 100, ease: Power2.easeOut },
        { opacity: 1, top: 0 },
        '>-0.2',
      );
    }
  }, [triggerStaticAnim, entry]);

  return (
    <div
      className="flex flex-col flex-nowrap h-auto w-[100vw] p-[0.8rem] pt-8 lg:pr-[1.2rem] box-border"
      ref={wrapperRef as LegacyRef<HTMLDivElement>}
    >
      {/* Image and Name */}
      <div className="w-full h-min flex flex-col items-center md:flex-row md:justify-center">
        <div className="h-full w-full flex flex-col items-start justify-center order-2 md:w-[50%] md:order-1">
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
              {NAME[nameIdx].first}
            </TextWithShadow>
            <TextWithShadow
              variant="heading"
              className="text-YellowRed dark:text-PastelPink w-full mt-[0.2rem] tracking-wide"
              shadowClassName="ts-china-rose-3 md:ts-china-rose-5 lg:ts-china-rose-5 dark:ts-deep-ruby-3 dark:md:ts-deep-ruby-4 dark:lg:ts-deep-ruby-5"
              ref={lastNameAnimRef}
            >
              {NAME[nameIdx].last}
            </TextWithShadow>
          </div>
          <p
            className="text-YellowRed dark:text-PastelPink relative text-2xl md:text-3xl lg:text-4xl"
            ref={tagLineAnimRef}
          >
            a frontend engineer
          </p>
        </div>
        <div className="h-full w-min order-1 md:w-[50%] md:order-2"></div>
      </div>

      {/* Intro Line */}
      <p className="text-justify">
        {description.map((text, idx) => (
          <span
            key={idx}
            ref={(el) => (introAnimRef.current[idx] = el)}
            className="text-PastelPink dark:text-EggShell text-base md:text-lg lg:text-xl relative mt-[0.2rem] md:mt-[0.6rem] lg:mt-[1rem] block font-light"
          >
            {text}
          </span>
        ))}
      </p>
    </div>
  );
});

export default React.memo(AboutPage);
