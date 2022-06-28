import type { NextPage } from 'next';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import ThemeToggle from '../Components/ThemeToggle';
import ErrorBoundary from '../Components/ErrorBoundary';
import SkillsPage from '../Components/SkillsPage';
import AboutPage from '../Components/AboutPage';
import { useRef } from 'react';
import useHeight from '../hooks/useHeight';
import useWindowSize from '../hooks/useScreenSize';
import ExperiencePage from '../Components/ExperiencePage';

const Home: NextPage = () => {
  const skillsPageRef = useRef(null);
  const aboutPageRef = useRef(null);
  const experiencePageRef = useRef(null);
  const [skillsPageHeight] = useHeight(skillsPageRef);
  const [aboutPageHeight] = useHeight(aboutPageRef);
  const [experiencePageHeight] = useHeight(experiencePageRef);

  const windowSize = useWindowSize();

  return (
    <ErrorBoundary>
      <ThemeToggle>
        <Parallax pages={3} className="top-0 left-0 bg-gray-100 dark:bg-black">
          <ParallaxLayer
            offset={0}
            speed={0.5}
            className="bg-PurpleTaupe dark:bg-EerieBlack drop-shadow-lg"
            style={
              aboutPageHeight > (windowSize.height || Number.POSITIVE_INFINITY)
                ? { height: aboutPageHeight }
                : {}
            }
          />
          <ParallaxLayer offset={0} speed={1.5}>
            <AboutPage ref={aboutPageRef} />
          </ParallaxLayer>

          <ParallaxLayer
            offset={1}
            speed={0.5}
            className="bg-YellowRed dark:bg-DarkBlue drop-shadow-lg"
            style={
              skillsPageHeight > (windowSize.height || Number.POSITIVE_INFINITY)
                ? { height: skillsPageHeight }
                : {}
            }
          />
          <ParallaxLayer offset={1} speed={1.5}>
            <SkillsPage ref={skillsPageRef} />
          </ParallaxLayer>

          <ParallaxLayer
            offset={2}
            speed={0.5}
            className="bg-PurpleTaupe  dark:bg-EerieBlack drop-shadow-lg"
            style={
              experiencePageHeight >
              (windowSize.height || Number.POSITIVE_INFINITY)
                ? { height: experiencePageHeight }
                : {}
            }
          />
          <ParallaxLayer offset={2} speed={1.5}>
            <ExperiencePage ref={experiencePageRef} />
          </ParallaxLayer>
        </Parallax>
      </ThemeToggle>
    </ErrorBoundary>
  );
};

export default Home;
