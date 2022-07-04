import type { NextPage } from 'next';
import { useEffect, useRef } from 'react';
import smoothScroll from 'smoothscroll-polyfill';
import ThemeToggle from '@components/ThemeToggle';
import ErrorBoundary from '@components/ErrorBoundary';
import SkillsPage from '@components/SkillsPage';
import AboutPage from '@components/AboutPage';
import ExperiencePage from '@components/ExperiencePage';

const Home: NextPage = () => {
  const skillsPageRef = useRef(null);
  const aboutPageRef = useRef(null);
  const experiencePageRef = useRef(null);

  useEffect(() => {
    smoothScroll.polyfill();
    document.documentElement.scrollTop = 0;
  }, []);

  return (
    <ErrorBoundary>
      <ThemeToggle>
        <AboutPage ref={aboutPageRef} className="bg-white dark:bg-EerieBlack" />
        <SkillsPage
          ref={skillsPageRef}
          className="bg-gradient dark:bg-gradient-DarkBlue"
        />
        <ExperiencePage
          ref={experiencePageRef}
          className="bg-white  dark:bg-EerieBlack"
        />
      </ThemeToggle>
    </ErrorBoundary>
  );
};

export default Home;
