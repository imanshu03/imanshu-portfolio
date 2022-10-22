import type { NextPage } from 'next';
import React, { useEffect } from 'react';
import smoothScroll from 'smoothscroll-polyfill';
import ErrorBoundary from '@components/ErrorBoundary';
import clsx from 'classnames';
import { PageComponents } from '@components/PageComponents';
import PageConfig from '../page.json';
import CustomCursor from '@components/CustomCursor';

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

  const getTheme = (index: number) => {
    return index % 2 === 0 ? 'theme1' : 'theme2';
  };

  let PageAppComponents = [...AppComponents];

  return (
    <ErrorBoundary>
      <CustomCursor />
      <main className="drop-shadow-lg my-0 mx-0 box-border">
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
    return { props: { PageConfig } };
  } catch (error) {
    return { notFound: true };
  }
}

export default Home;
