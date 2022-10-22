import { useEffect, useState } from 'react';

export const useMobileDevice = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const details = navigator.userAgent;
    const regexp = /android|iphone|kindle|ipad/i;
    const isMobileDevice = regexp.test(details);
    setIsMobile(isMobileDevice);
  }, []);

  return isMobile;
};
