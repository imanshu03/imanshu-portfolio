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
    <main>
      <div
        className="flex flex-row flex-nowrap items-center justify-around cursor-pointer absolute top-[0.4rem] right-[0.8rem] lg:right-[1.2rem] z-50 mix-blend-hard-light outline-none focus:outline-none"
        onClick={onThemeChange}
        ref={themeIconRef}
      >
        {toggle ? (
          <MoonIcon className="w-5 h-5 fill-DeepBlue" />
        ) : (
          <SunIcon className="w-5 h-5 fill-MacroniCheese" />
        )}
      </div>
      <ThemeContext.Provider value={toggle ? 'light' : 'dark'}>
        {children}
      </ThemeContext.Provider>
    </main>
  );
};

export default ThemeToggle;
