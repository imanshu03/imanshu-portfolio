import { RefObject, useEffect, useState } from 'react';

const useHeight = (ref: RefObject<Element>) => {
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    function resize() {
      setHeight(ref.current?.clientHeight || 0);
    }
    window.addEventListener('resize', resize);
    setTimeout(() => resize(), 0);
    return () => window.removeEventListener('resize', resize);
  }, [ref]);

  return height;
};

export default useHeight;
