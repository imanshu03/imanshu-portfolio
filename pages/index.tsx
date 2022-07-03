import type { NextPage } from 'next';
import smoothScroll from 'smoothscroll-polyfill';
import ThemeToggle from '../Components/ThemeToggle';
import ErrorBoundary from '../Components/ErrorBoundary';
import SkillsPage from '../Components/SkillsPage';
import AboutPage from '../Components/AboutPage';
import { useEffect, useRef } from 'react';
import ExperiencePage from '../Components/ExperiencePage';

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
          className="bg-YellowRed dark:bg-DarkBlue"
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
