import type { NextPage } from 'next';
import React, { useEffect } from 'react';
import axios from 'axios';
import smoothScroll from 'smoothscroll-polyfill';
import ThemeToggle from '@components/ThemeToggle';
import ErrorBoundary from '@components/ErrorBoundary';
import clsx from 'classnames';
import { PageComponents } from '@components/PageComponents';

interface IProps {
  PageConfig: {
    AppComponents?: Array<{
      Component: string;
      props: any;
    }>;
    defaultMode?: 'light' | 'dark';
    enableToggleMode?: boolean;
    reverseThemeOrder?: boolean;
    disableSessionTheme?: boolean;
  };
}

const Home: NextPage<IProps> = (props) => {
  useEffect(() => {
    smoothScroll.polyfill();
    document.documentElement.scrollTop = 0;
  }, []);

  const {
    PageConfig: {
      AppComponents = [],
      defaultMode = 'light',
      enableToggleMode = true,
      reverseThemeOrder = false,
      disableSessionTheme = false,
    },
  } = props;

  const getTheme = (index: number) => {
    if (index % 2 === 0) {
      return !reverseThemeOrder ? 'theme1' : 'theme2';
    }
    return !reverseThemeOrder ? 'theme2' : 'theme1';
  };

  return (
    <ErrorBoundary>
      <ThemeToggle
        defaultMode={defaultMode}
        enableToggleMode={enableToggleMode}
        disableSessionTheme={disableSessionTheme}
      >
        {AppComponents.map((pageItem, index) => {
          const Component = (PageComponents as any)[pageItem.Component];
          if (Component) {
            return (
              <Component
                key={pageItem.Component}
                pageData={pageItem.props.pageData}
                className={clsx(
                  `section-${getTheme(index)}`,
                  pageItem.props.className,
                )}
                version={getTheme(index)}
              />
            );
          }
          return null;
        })}
      </ThemeToggle>
    </ErrorBoundary>
  );
};

export async function getServerSideProps() {
  try {
    const response = await axios.get(process.env.CONFIG_URL ?? '');
    return { props: { PageConfig: response.data } };
  } catch (error) {
    console.log(error);
    return { notFound: true };
  }
}

export default Home;
