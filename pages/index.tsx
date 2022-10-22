import type { NextPage } from 'next';
import React, { useEffect } from 'react';
import smoothScroll from 'smoothscroll-polyfill';
import ErrorBoundary from '@components/ErrorBoundary';
import clsx from 'classnames';
import { PageComponents } from '@components/PageComponents';
import PageConfig from '../page.json';
import CustomCursor from '@components/CustomCursor';
import { useMobileDevice } from '@hooks/useMobileDevice';
import { useAnimationDisabled } from '@hooks/useAnimationDisabled';

interface IProps {
  PageConfig: {
    AppComponents?: Array<{
      Component: string;
      className?: string;
      order: number;
      props: any;
    }>;
    defaultMode?: 'light' | 'dark';
    enableToggleMode?: boolean;
    disableSessionTheme?: boolean;
  };
}

const Home: NextPage<IProps> = (props) => {
  useEffect(() => {
    smoothScroll.polyfill();
    document.documentElement.scrollTop = 0;
  }, []);

  const {
    PageConfig: { AppComponents = [] },
  } = props;
  const isMobileDevice = useMobileDevice();
  const isAnimationDisabled = useAnimationDisabled();
  const getTheme = (index: number) => {
    return index % 2 === 0 ? 'theme1' : 'theme2';
  };

  let PageAppComponents = [...AppComponents];

  return (
    <ErrorBoundary>
      {!isMobileDevice && !isAnimationDisabled ? <CustomCursor /> : null}
      <main
        className={clsx('drop-shadow-lg my-0 mx-0 box-border cursor-auto', {
          'cursor-none': !isMobileDevice && !isAnimationDisabled,
        })}
      >
        {PageAppComponents.map((pageItem, index) => {
          const Component = (PageComponents as any)[pageItem.Component];
          if (Component) {
            return (
              <Component
                key={pageItem.Component}
                pageData={pageItem.props.pageData}
                className={clsx(
                  `section-${getTheme(index)}`,
                  pageItem.className,
                )}
              />
            );
          }
          return null;
        })}
      </main>
    </ErrorBoundary>
  );
};

export async function getStaticProps() {
  try {
    return { props: { PageConfig }, revalidate: 3600 };
  } catch (error) {
    return { notFound: true };
  }
}

export default Home;
