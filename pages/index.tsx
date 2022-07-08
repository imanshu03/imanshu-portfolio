import type { NextPage } from 'next';
import React, { useEffect } from 'react';
import axios from 'axios';
import smoothScroll from 'smoothscroll-polyfill';
import ThemeToggle from '@components/ThemeToggle';
import ErrorBoundary from '@components/ErrorBoundary';
import clsx from 'classnames';
import { PageComponents } from '@components/PageComponents';

const Home: NextPage<{ PageConfig: any[] }> = ({ PageConfig }) => {
  useEffect(() => {
    smoothScroll.polyfill();
    document.documentElement.scrollTop = 0;
  }, []);

  return (
    <ErrorBoundary>
      <ThemeToggle>
        {PageConfig.map((pageItem, index) => {
          const Component = (PageComponents as any)[pageItem.Component];
          if (Component) {
            return (
              <Component
                key={pageItem.Component}
                pageData={pageItem.props.pageData}
                className={clsx(
                  { 'section-primary': index % 2 === 0 },
                  { 'section-secondary': index % 2 !== 0 },
                  pageItem.props.className,
                )}
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
