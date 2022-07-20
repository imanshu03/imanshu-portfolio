import type { NextPage } from 'next';
import React, { useEffect } from 'react';
import axios from 'axios';
import smoothScroll from 'smoothscroll-polyfill';
import ThemeToggle from '@components/ThemeToggle';
import ErrorBoundary from '@components/ErrorBoundary';
import clsx from 'classnames';
import { PageComponents } from '@components/PageComponents';
import PageConfig from '../page.json';

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
    PageConfig: {
      AppComponents = [],
      defaultMode = 'dark',
      enableToggleMode = true,
      disableSessionTheme = false,
    },
  } = props;

  const getTheme = (index: number) => {
    return index % 2 === 0 ? 'theme1' : 'theme2';
  };

  let PageAppComponents = [...AppComponents];

  return (
    <ErrorBoundary>
      <ThemeToggle
        defaultMode={defaultMode}
        enableToggleMode={enableToggleMode}
        disableSessionTheme={disableSessionTheme}
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

export async function getStaticProps() {
  try {
    // const response = await axios.get(process.env.CONFIG_URL ?? '');
    return { props: { PageConfig } };
  } catch (error) {
    return { notFound: true };
  }
}

export default Home;
