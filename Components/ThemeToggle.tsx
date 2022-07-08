import React, { createContext, useEffect, useRef, useState, memo } from 'react';
import { gsap, Power2 } from 'gsap';
import MoonIcon from '@assets/MoonIcon';
import SunIcon from '@assets/SunIcon';

export const ThemeContext = createContext<string>('');

type MODES = 'dark' | 'light';

interface IProps {
  children?: React.ReactNode;
  defaultMode: MODES;
  enableToggleMode: boolean;
  disableSessionTheme: boolean;
}

const ThemeToggle: React.FC<IProps> = (props) => {
  const { children, defaultMode, enableToggleMode, disableSessionTheme } =
    props;
  const [mode, setMode] = useState<MODES>(defaultMode);
  const themeIconRef = useRef<HTMLDivElement>(null);

  const onThemeChange = () => {
    let newMode: MODES = mode === 'light' ? 'dark' : 'light';
    document.documentElement.classList.toggle('dark');
    !disableSessionTheme && sessionStorage.setItem('theme', newMode);
    setMode(newMode);
  };

  useEffect(() => {
    document.documentElement.classList.remove(...['light', 'dark']);
    if (!enableToggleMode) {
      defaultMode === 'dark' && document.documentElement.classList.add('dark');
      setMode(defaultMode);
    } else {
      const theme = sessionStorage.getItem('theme');
      if (!disableSessionTheme && theme && ['light', 'dark'].includes(theme)) {
        theme === 'dark' && document.documentElement.classList.add('dark');
        setMode(theme as MODES);
      } else {
        sessionStorage.removeItem('theme');
        !disableSessionTheme && sessionStorage.setItem('theme', defaultMode);
        defaultMode === 'dark' &&
          document.documentElement.classList.add('dark');
        setMode(defaultMode);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    gsap.fromTo(
      themeIconRef.current,
      { opacity: 0, ease: Power2.easeOut },
      { opacity: 1 },
    );
  }, []);

  return (
    <main className="px-0 md:px-[6rem] lg:px-[10rem] xl:px-[15rem] w-[100vw] box-border bg-gray-50 dark:bg-black">
      {enableToggleMode && (
        <div
          className="cursor-pointer fixed top-[0.4rem] right-[0.8rem] lg:right-[1.2rem] z-50 mix-blend-hard-light first-letter:outline-none focus:outline-none"
          onClick={onThemeChange}
          ref={themeIconRef}
        >
          {mode === 'light' ? (
            <MoonIcon className="w-5 h-5 fill-DeepBlue" />
          ) : (
            <SunIcon className="w-5 h-5 fill-MacroniCheese" />
          )}
        </div>
      )}
      <div className="drop-shadow-md">
        <ThemeContext.Provider value={mode}>{children}</ThemeContext.Provider>
      </div>
    </main>
  );
};

export default memo(ThemeToggle);
