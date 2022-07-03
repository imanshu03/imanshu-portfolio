import React, { createContext, useEffect, useRef, useState } from 'react';
import { gsap, Power2 } from 'gsap';
import MoonIcon from '../Assets/MoonIcon';
import SunIcon from '../Assets/SunIcon';

export const ThemeContext = createContext<string>('dark');

const ThemeToggle: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toggle, setToggle] = useState<boolean>(true);
  const themeIconRef = useRef<HTMLDivElement>(null);

  const onThemeChange = () => {
    setToggle(!toggle);
    document.documentElement.classList.toggle('dark');
    sessionStorage.setItem('theme', !toggle ? 'light' : 'dark');
  };

  useEffect(() => {
    const theme = sessionStorage.getItem('theme');
    document.documentElement.classList.remove(...['light', 'dark']);
    if (theme && ['light', 'dark'].includes(theme)) {
      setToggle(theme === 'light');
      if (theme === 'dark') document.documentElement.classList.add('dark');
    } else {
      sessionStorage.removeItem('theme');
      sessionStorage.setItem('theme', 'light');
      setToggle(true);
    }
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
      <div
        className="cursor-pointer fixed top-[0.4rem] right-[0.8rem] lg:right-[1.2rem] z-50 mix-blend-hard-light first-letter:outline-none focus:outline-none"
        onClick={onThemeChange}
        ref={themeIconRef}
      >
        {toggle ? (
          <MoonIcon className="w-5 h-5 fill-DeepBlue" />
        ) : (
          <SunIcon className="w-5 h-5 fill-MacroniCheese" />
        )}
      </div>
      <div className="drop-shadow-md">
        <ThemeContext.Provider value={toggle ? 'light' : 'dark'}>
          {children}
        </ThemeContext.Provider>
      </div>
    </main>
  );
};

export default ThemeToggle;
