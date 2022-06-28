import type { NextPage } from 'next';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import ThemeToggle from '../Components/ThemeToggle';
import ErrorBoundary from '../Components/ErrorBoundary';
import SkillsPage from '../Components/SkillsPage';
import AboutPage from '../Components/AboutPage';
import { useRef } from 'react';
import useHeight from '../hooks/useHeight';
import useWindowSize from '../hooks/useScreenSize';

const Home: NextPage = () => {
  const skillsSectionRef = useRef(null);
  const [skillsSectionHeight] = useHeight(skillsSectionRef);
  const windowSize = useWindowSize();

  console.log({ skillsSectionHeight, skillsSectionRef, windowSize });
  return (
    <ErrorBoundary>
      <ThemeToggle>
        <Parallax pages={3} className="top-0 left-0 bg-gray-100 dark:bg-black">
          <ParallaxLayer
            offset={0}
            speed={0.5}
            className="bg-PurpleTaupe dark:bg-DarkBlue"
          />

          <ParallaxLayer offset={0} speed={1.5}>
            <AboutPage />
          </ParallaxLayer>
          <ParallaxLayer
            offset={1}
            speed={0.5}
            className=" bg-YellowRed  dark:bg-EerieBlack"
            style={
              skillsSectionHeight >
              (windowSize.height || Number.POSITIVE_INFINITY)
                ? { height: skillsSectionHeight }
                : {}
            }
          />
          <ParallaxLayer offset={1} speed={1.5}>
            <SkillsPage ref={skillsSectionRef} />
          </ParallaxLayer>
        </Parallax>
      </ThemeToggle>
    </ErrorBoundary>
  );
};

export default Home;
