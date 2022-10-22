import SectionHeading from '@common/SectionHeading';
import CustomCursor from '@components/CustomCursor';
import ErrorBoundary from '@components/ErrorBoundary';
import { useMobileDevice } from '@hooks/useMobileDevice';
import { NextPage } from 'next';
import React from 'react';
import articlesData from '../articles.json';
import BackArrow from 'assets/BackArrow';
import { useRouter } from 'next/router';
import clsx from 'classnames';
import { useAnimationDisabled } from '@hooks/useAnimationDisabled';

interface IArticlesPage {
  articlesData: Array<{
    heading: string;
    url: string;
  }>;
}

const ArticlesPage: NextPage<IArticlesPage> = ({ articlesData }) => {
  const isMobileDevice = useMobileDevice();
  const isAnimationDisabled = useAnimationDisabled();
  const Router = useRouter();
  return (
    <ErrorBoundary>
      {!isMobileDevice && !isAnimationDisabled ? <CustomCursor /> : null}
      <div
        className={clsx(
          'min-h-screen section-theme1 pd-section md:px-[6rem] lg:px-[10rem] xl:px-[15rem]',
          { '!cursor-none': !isMobileDevice && !isAnimationDisabled },
        )}
      >
        <div className="flex flex-row flex-nowrap items-center justify-start">
          <div className="mr-[1rem]">
            <BackArrow
              className={clsx(
                'rotate-180 [&>*]:fill-PastelPink w-[1rem] h-[1rem] md:w-[1.5rem] md:h-[1.5rem] lg:w-[2rem] lg:h-[2rem]',
              )}
              onClick={() => Router.push('/')}
            />
          </div>
          <SectionHeading
            heading="articles"
            subHeading="i like to share my learnings"
            timeline={null}
          />
        </div>
        <ul className="list-disc mt-8 ml-[1rem]">
          {articlesData.map((item, index) => (
            <li
              key={index}
              className="text-EggShell text-base md:text-lg lg:text-xl box-border mt-[0.5rem] md:mt-[1rem] lg:mt-[1.5rem] max-w-fit"
            >
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className={clsx({
                  '!cursor-none': !isMobileDevice && !isAnimationDisabled,
                })}
              >
                {item.heading}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </ErrorBoundary>
  );
};

export async function getStaticProps() {
  try {
    return { props: { articlesData }, revalidate: 3600 };
  } catch (error) {
    return { notFound: true };
  }
}

export default ArticlesPage;
