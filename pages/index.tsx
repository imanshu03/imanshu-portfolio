import type { NextPage } from 'next';
import AboutPage from '../Components/AboutPage';
import { IParallax, Parallax, ParallaxLayer } from '@react-spring/parallax';
import ThemeToggle from '../Components/ThemeToggle';
import { useRef } from 'react';
import SkillsPage from '../Components/SkillsPage';
import ErrorBoundary from '../Components/ErrorBoundary';

const Home: NextPage = () => {
  const ref = useRef<IParallax>(null);

  return (
    <ErrorBoundary>
      <ThemeToggle>
        <Parallax
          pages={2}
          className="top-0 left-0 bg-white dark:bg-black"
          ref={ref}
        >
          <ParallaxLayer
            offset={0}
            speed={0.5}
            className="dark:bg-darkMainPurple"
          />
          <ParallaxLayer offset={0} speed={1.5}>
            <AboutPage />
          </ParallaxLayer>
          <ParallaxLayer
            offset={1}
            speed={0.5}
            className="dark:bg-darkMainYellow"
          />
          <ParallaxLayer offset={1} speed={1.5}>
            <SkillsPage />
          </ParallaxLayer>
        </Parallax>
      </ThemeToggle>
    </ErrorBoundary>
  );
};

export default Home;
