import { RefObject, useEffect, useState } from 'react';

const useWidth = (ref: RefObject<Element>) => {
  const [width, setWidth] = useState({
    clientWidth: 0,
    scrollWidth: 0,
  });

  useEffect(() => {
    function resize() {
      setWidth({
        clientWidth: ref.current?.clientWidth || 0,
        scrollWidth: ref.current?.scrollWidth || 0,
      });
    }
    window.addEventListener('resize', resize);
    setTimeout(() => resize(), 0);
    return () => window.removeEventListener('resize', resize);
  }, [ref]);

  return width;
};

export default useWidth;
