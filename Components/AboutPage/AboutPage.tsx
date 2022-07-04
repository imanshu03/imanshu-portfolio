import React, { forwardRef, useEffect, useMemo, useRef } from 'react';
import Lottie from 'react-lottie';
import Image from 'next/image';
import { Power2 } from 'gsap';
import TextWithShadow from '@common/TextWithShadow';
import useIntersectionObserver from '@hooks/useIntersectionObserver';
import useTimeline from '@hooks/useTimeline';
import ProfileImage from '@assets/profile.webp';
import Rocket from '@assets/rocket.json';

const description = [
  'I have more than 2.5 years of experience in software development. I believe in developing modern, reactive and user friendly web applications using the latest technologies.',
  'I believe a perfect blend of software design is one, where the goals and needs are accounted for in an elegant, efficient and robust design of the software.',
  'If I am not working then there is a high chance that I am busy potting pool balls with my cue or leading my player for a Winner Winner Chicken Dinner!',
  'Scroll down to know more about me.',
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
    const imageAnimTimeline = useTimeline();

    const greetAnimRef = useRef(null);
    const firstNameAnimRef = useRef(null);
    const lastNameAnimRef = useRef(null);
    const tagLineAnimRef = useRef(null);
    const introAnimRef = useRef(null);
    const imageAnimRef = useRef(null);

    // adding tweens to timelines
    useEffect(() => {
      if (!masterTimeline) return;
      masterTimeline.addLabel('greetRef', 0);
      masterTimeline.addLabel('imageRef', 0.2);
      masterTimeline.addLabel('nameRef', 0.2);
      masterTimeline.addLabel('taglineRef', 0.6);
      masterTimeline.addLabel('introRef', 0.8);

      masterTimeline.fromTo(
        greetAnimRef.current,
        { left: 50, opacity: 0, ease: Power2.easeOut },
        { left: 0, opacity: 1 },
        'greetRef',
      );
      masterTimeline.fromTo(
        imageAnimRef.current,
        {
          top: '10%',
          opacity: 0,
          ease: Power2.easeOut,
        },
        {
          top: '50%',
          opacity: 1,
        },
        'imageRef',
      );
      masterTimeline.fromTo(
        firstNameAnimRef.current,
        { opacity: 0, top: 100, ease: Power2.easeOut },
        { opacity: 1, top: 0 },
        'nameRef',
      );
      masterTimeline.fromTo(
        lastNameAnimRef.current,
        { opacity: 0, top: 100, ease: Power2.easeOut },
        {
          opacity: 1,
          top: 0,
        },
        '<0.2',
      );
      masterTimeline.fromTo(
        tagLineAnimRef.current,
        { opacity: 0, left: -50, ease: Power2.easeOut },
        { opacity: 1, left: 0 },
        'taglineRef',
      );
      masterTimeline.fromTo(
        introAnimRef.current,
        { opacity: 0, ease: Power2.easeOut },
        { opacity: 1 },
        'introRef',
      );
    }, [masterTimeline]);

    // play master timeline on view
    useEffect(() => {
      if (!masterTimeline) return;
      if (isIntersecting) masterTimeline.play();
    }, [isIntersecting, masterTimeline]);

    return (
      <div
        className={`flex flex-col flex-nowrap h-[100vh] w-full p-[0.8rem] pt-8 lg:pr-[1.2rem] box-border ${className}`}
        ref={wrapperRef as any}
      >
        {/* Image and Name */}
        <div className="w-full h-min flex flex-col items-center md:flex-row md:justify-center">
          <div className="h-full w-full flex flex-col items-start justify-center order-2 md:w-[60%] md:order-1">
            <p
              className="text-AteneoBlue dark:text-PastelPink text-2xl md:text-3xl lg:text-4xl relative"
              ref={greetAnimRef}
            >
              hi, i am
            </p>
            <div className="flex flex-col flex-wrap items-start justify-center">
              <TextWithShadow
                variant="heading"
                className="text-AteneoBlue dark:text-PastelPink w-full tracking-wide"
                shadowClassName="ts-wild-blue-3 md:ts-wild-blue-5 lg:ts-wild-blue-5 dark:ts-deep-ruby-3 dark:md:ts-deep-ruby-4 dark:lg:ts-deep-ruby-5"
                ref={firstNameAnimRef}
              >
                imanshu
              </TextWithShadow>
              <TextWithShadow
                variant="heading"
                className="text-AteneoBlue dark:text-PastelPink w-full mt-[0.2rem] tracking-wide"
                shadowClassName="ts-wild-blue-3 md:ts-wild-blue-5 lg:ts-wild-blue-5 dark:ts-deep-ruby-3 dark:md:ts-deep-ruby-4 dark:lg:ts-deep-ruby-5"
                ref={lastNameAnimRef}
              >
                rathore
              </TextWithShadow>
            </div>
            <p
              className="text-AteneoBlue dark:text-PastelPink relative text-2xl md:text-3xl lg:text-4xl"
              ref={tagLineAnimRef}
            >
              a frontend engineer
            </p>
          </div>
          <div className="h-full w-min order-1 md:w-[40%] md:order-2 my-4 md:my-0">
            <div
              className="w-[8rem] h-[8rem] md:w-[10rem] md:h-[10rem] flex relative left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
              ref={imageAnimRef}
            >
              <Image
                src={ProfileImage}
                alt="Profile Image"
                className="rounded-[50%] dark:grayscale"
              />
              <div className=""></div>
            </div>
          </div>
        </div>

        {/* Intro Line */}
        <p className="text-justify" ref={introAnimRef}>
          {description.map((text, idx) => (
            <span
              key={idx}
              className="text-GunMetal dark:text-EggShell text-base md:text-lg lg:text-xl relative mt-[0.2rem] md:mt-[0.6rem] lg:mt-[1rem] block font-light"
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
