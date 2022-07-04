import React, {
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useContext,
  memo,
} from 'react';
import Image from 'next/image';
import { Power2 } from 'gsap';
import TextWithShadow from '@common/TextWithShadow';
import useIntersectionObserver from '@hooks/useIntersectionObserver';
import useTimeline from '@hooks/useTimeline';
import { useLottie } from 'lottie-react';
import ProfileImage from '@assets/profile.webp';
import ProfileMaskImage from '@assets/profile-mask.webp';
import RocketWhite from '@assets/RocketWhite.json';
import RocketBlue from '@assets/RocketBlue.json';
import { ThemeContext } from '@components/ThemeToggle';

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
      { threshold: 0.2 },
    );
    const isIntersecting = useMemo(() => entry?.isIntersecting, [entry]);

    // setting lottie data based upon theme
    const theme = useContext(ThemeContext);
    const { View: RocketLottie } = useLottie({
      loop: true,
      animationData: theme === 'light' ? RocketBlue : RocketWhite,
      autoplay: true,
    });

    // animation timelines
    const masterTimeline = useTimeline();
    const imageAnimTimeline = useTimeline();

    // refs for animation
    const greetAnimRef = useRef(null);
    const firstNameAnimRef = useRef(null);
    const lastNameAnimRef = useRef(null);
    const tagLineAnimRef = useRef(null);
    const introAnimRef = useRef(null);
    const imageAnimRef = useRef(null);
    const rocketLottieRef = useRef(null);

    // adding tweens to timelines
    useEffect(() => {
      if (!masterTimeline) return;
      masterTimeline.addLabel('greetRef', 0);
      masterTimeline.addLabel('imageRef', 0.2);
      masterTimeline.addLabel('nameRef', 0.2);
      masterTimeline.addLabel('taglineRef', 0.6);
      masterTimeline.addLabel('introRef', 0.8);
      masterTimeline.addLabel('rocketRef', 0.4);

      masterTimeline.fromTo(
        greetAnimRef.current,
        { left: 50, opacity: 0, ease: Power2.easeOut },
        { left: 0, opacity: 1 },
        'greetRef',
      );
      masterTimeline.fromTo(
        imageAnimRef.current,
        {
          top: '-30%',
          opacity: 0,
          ease: Power2.easeOut,
        },
        {
          top: 0,
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
      masterTimeline.fromTo(
        rocketLottieRef.current,
        {
          right: 0,
          top: 0,
          scale: '0.6',
          opacity: 0,
          ease: Power2.easeOut,
        },
        {
          right: '-32%',
          top: '-56%',
          scale: 1.1,
          opacity: 1.1,
        },
        'rocketRef',
      );
      masterTimeline.fromTo(
        rocketLottieRef.current,
        {
          right: '-32%',
          top: '-56%',
          scale: 1.1,
          ease: Power2.easeInOut,
        },
        {
          right: '-30%',
          top: '-52%',
          scale: 1,
        },
        '>',
      );
    }, [masterTimeline]);

    // play master timeline on view
    useEffect(() => {
      if (!masterTimeline) return;
      if (isIntersecting) masterTimeline.play();
    }, [isIntersecting, masterTimeline]);

    return (
      <div
        className={`flex flex-col flex-nowrap box-border ${className}`}
        ref={wrapperRef as any}
      >
        <div className="w-full h-min flex flex-col items-center justify-center relative">
          <div className="w-full order-1 md:order-2 my-4 md:my-8 flex justify-center items-center">
            <div
              className="w-[8rem] h-[8rem] md:w-[10rem] md:h-[10rem] lg:h-[12rem] lg:w-[12rem] flex relative"
              ref={imageAnimRef}
            >
              <Image
                src={ProfileImage}
                alt="Profile Image"
                className="rounded-[50%] dark:grayscale w-[100%] h-[100%]"
                loading="eager"
              />
              <div className="absolute w-full h-full flex">
                <Image
                  src={ProfileMaskImage}
                  alt="Profile Image"
                  className="rounded-[50%] dark:grayscale w-[100%] h-[100%] absolute left-0 top-0 z-50"
                  loading="eager"
                />
              </div>
              <div
                className="absolute h-[90%] w-[90%] z-10 right-[-56%] top-[-34%]"
                ref={rocketLottieRef}
              >
                {RocketLottie}
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col items-center justify-center order-2">
            <p
              className="text-AteneoBlue dark:text-PastelPink text-2xl md:text-3xl lg:text-4xl relative"
              ref={greetAnimRef}
            >
              hi, i am
            </p>
            <div className="flex flex-col items-center justify-center mb-3">
              <TextWithShadow
                variant="h1"
                className="text-AteneoBlue dark:text-PastelPink tracking-wide"
                shadowClassName="ts-wild-blue-3 md:ts-wild-blue-5 lg:ts-wild-blue-5 dark:ts-deep-ruby-3 dark:md:ts-deep-ruby-4 dark:lg:ts-deep-ruby-5"
                ref={firstNameAnimRef}
              >
                imanshu
              </TextWithShadow>
              <TextWithShadow
                variant="h1"
                className="text-AteneoBlue dark:text-PastelPink tracking-wide"
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
        </div>

        <p className="text-justify mt-2 md:mt-4 lg:mt-6" ref={introAnimRef}>
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

export default memo(AboutPage);
