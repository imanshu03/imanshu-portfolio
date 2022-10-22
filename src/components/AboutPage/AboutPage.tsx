import React, { useEffect, useMemo, useRef, memo } from 'react';
import clsx from 'classnames';
import Image from 'next/image';
import { Power2 } from 'gsap';
import useIntersectionObserver from '@hooks/useIntersectionObserver';
import TextWithShadow from '@common/TextWithShadow';
import useTimeline from '@hooks/useTimeline';
import { useLottie } from 'lottie-react';
import ProfileImage from '@assets/profile.webp';
import ProfileMaskImage from '@assets/profile-mask.webp';
import RocketWhite from '@assets/RocketWhite.json';
import CurveWrapper from '@common/CurveWrapper';

interface IProps {
  className?: string;
  pageData: {
    greetLine?: string;
    firstName?: string;
    lastName?: string;
    tagLine?: string;
    description?: string[];
  };
}

const AboutPage: React.FC<IProps> = (props) => {
  const { className, pageData } = props;
  const wrapperRef = useRef(null);
  const entry = useIntersectionObserver(wrapperRef);
  const isIntersecting = useMemo(() => entry?.isIntersecting, [entry]);

  const { View: RocketLottie } = useLottie({
    loop: true,
    animationData: RocketWhite,
    autoplay: true,
  });

  const masterTimeline = useTimeline(
    {},
    { enableScrollTrigger: false, pauseOnInit: true },
  );

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
      { top: 100, opacity: 0, ease: Power2.easeOut },
      { top: 0, opacity: 1 },
      'greetRef',
    );
    masterTimeline.fromTo(
      imageAnimRef.current,
      {
        top: '-100px',
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
      className={clsx(className, 'relative')}
      ref={wrapperRef as any}
      id="about"
    >
      <div className="pd-section md:px-[6rem] lg:px-[10rem] xl:px-[15rem] relative z-10">
        <div className="w-full h-min flex flex-col items-center justify-center">
          <div className="w-full order-1 md:order-2 my-4 md:my-8 flex justify-center items-center">
            <div
              className="w-[8rem] h-[8rem] md:w-[10rem] md:h-[10rem] lg:h-[12rem] lg:w-[12rem] flex relative"
              ref={imageAnimRef}
            >
              <Image
                src={ProfileImage}
                alt="Profile Image"
                className="rounded-[50%] grayscale w-[8rem] h-[8rem] md:w-[10rem] md:h-[10rem] lg:h-[12rem] lg:w-[12rem]"
                loading="eager"
              />
              <div className="absolute w-full h-full flex">
                <Image
                  src={ProfileMaskImage}
                  alt="Profile Image"
                  className="rounded-[50%] grayscale w-[8rem] h-[8rem] md:w-[10rem] md:h-[10rem] lg:h-[12rem] lg:w-[12rem] absolute left-0 top-0 z-50"
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
            {pageData.greetLine && (
              <p
                className="hd3-size hd-color lowercase relative"
                ref={greetAnimRef}
              >
                {pageData.greetLine}
              </p>
            )}
            <div className="flex flex-col items-center justify-center mb-3">
              <TextWithShadow
                variant="h1"
                className="hd-color lowercase tracking-wide"
                shadowClassName="hd-shadow"
                ref={firstNameAnimRef}
              >
                {pageData.firstName}
              </TextWithShadow>
              {pageData.lastName && (
                <TextWithShadow
                  variant="h1"
                  className="hd-color lowercase tracking-wide"
                  shadowClassName="hd-shadow"
                  ref={lastNameAnimRef}
                >
                  {pageData.lastName}
                </TextWithShadow>
              )}
            </div>
            {pageData.tagLine && (
              <p className="hd3-size hd-color lowercase" ref={tagLineAnimRef}>
                {pageData.tagLine}
              </p>
            )}
          </div>
        </div>

        {pageData.description && pageData.description.length > 0 && (
          <p className="text-justify p1-color p1-size" ref={introAnimRef}>
            {pageData.description.map((text, idx) => (
              <span
                key={idx}
                className="mt-[0.4rem] md:mt-[0.6rem] lg:mt-[1rem] block"
              >
                {text}
              </span>
            ))}
          </p>
        )}
      </div>

      <CurveWrapper direction="down" className="absolute bottom-0" />
    </div>
  );
};

export default memo(AboutPage);
