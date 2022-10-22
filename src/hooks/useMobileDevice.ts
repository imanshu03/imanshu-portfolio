import { useLayoutEffect, useState } from 'react';

export const useMobileDevice = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useLayoutEffect(() => {
    const details = navigator.userAgent;
    const regexp = /android|iphone|kindle|ipad/i;
    const isMobileDevice = regexp.test(details);
    setIsMobile(isMobileDevice);
  }, []);

  return isMobile;
};
