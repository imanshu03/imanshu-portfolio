import { useState, useEffect } from 'react';

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });
  useEffect(() => {
    function handleResize() {
      const height = Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0,
      );
      const width = Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0,
      );
      setWindowSize({
        width,
        height,
      });
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return windowSize;
};

export default useWindowSize;
