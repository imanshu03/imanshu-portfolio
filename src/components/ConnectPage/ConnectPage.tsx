import React, { useEffect, useRef } from 'react';
import { Power2 } from 'gsap';
import { Icons } from '@assets/Connect';
import useTimeline from '@hooks/useTimeline';
import clsx from 'classnames';
import SectionHeading from '@common/SectionHeading';
import Button3D from '@common/Button3D';

interface IProps {
  className?: string;
  pageData: {
    sectionHeadingText: string;
    sectionSubHeadingText?: string;
    linksData: Array<{
      icon?: string;
      heading: string;
      href?: string;
      url?: string;
    }>;
  };
}

const ConnectPage: React.FC<IProps> = (props) => {
  const {
    className,
    pageData: { sectionHeadingText, sectionSubHeadingText, linksData },
  } = props;
  const boxRefs = useRef(linksData.map(() => null));

  const masterTimeline = useTimeline({
    scrollTrigger: {
      trigger: '#connect',
      scrub: 1,
      start: 'top bottom',
      end: 'bottom bottom',
    },
  });

  useEffect(() => {
    if (!masterTimeline || !boxRefs.current.every((e) => e)) return;
    console.log({ boxRefs });
    boxRefs.current.forEach((ref, index) => {
      masterTimeline.addLabel(`showBox_${index}`, (index + 1) * 0.4);
      masterTimeline.fromTo(
        ref,
        {
          opacity: 0,
          ease: Power2.easeOut,
        },
        { opacity: 1 },
        `showBox_${index}`,
      );
      masterTimeline.fromTo(
        ref,
        {
          opacity: 0,
          top: 100,
          ease: Power2.easeOut,
        },
        { opacity: 1, top: 0 },
        `showBox_${index}+=0.1`,
      );
    });
  }, [masterTimeline, boxRefs]);

  const onLinkClick = ({ url, href }: { url?: string; href?: string }) => {
    if (url) {
      return window.open(url, '_blank');
    }
    if (href) {
      return window.open(href);
    }
  };

  return (
    <div id="connect" className={clsx(className)}>
      <div className="pd-section md:px-[6rem] lg:px-[10rem] xl:px-[15rem]">
        <SectionHeading
          timeline={masterTimeline}
          heading={sectionHeadingText}
          subHeading={sectionSubHeadingText}
          variant="primary"
        />
        {linksData && linksData.length ? (
          <div className="flex flex-col md:flex-row items-center justify-around flex-wrap py-10 md:py-12 lg:py-14 overflow-hidden">
            {linksData.map((link, index) => {
              const DisplayIcon = link.icon ? Icons[link.icon] : null;
              return (
                <Button3D
                  key={link.heading}
                  ref={(e) => (boxRefs.current[index] = e)}
                  className="mb-8 mx-0 md:mx-8 lg:mb-0"
                  onMouseUp={() => onLinkClick(link)}
                >
                  <div className="flex flex-row items-center justify-center">
                    <DisplayIcon className="h-[1rem] w-[1rem]" />
                    <span className="ml-2 text-base">{link.heading}</span>
                  </div>
                </Button3D>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ConnectPage;
