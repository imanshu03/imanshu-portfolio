export const checkIfMobileDevice = () => {
  const details = navigator.userAgent;
  const regexp = /android|iphone|kindle|ipad/i;
  const isMobileDevice = regexp.test(details);
  return isMobileDevice;
};

export const checkIfAnimationDisabled = () => {
  const isAnimationDisabled = Boolean(
    localStorage.getItem('isAnimationDisabled')
      ? Number(localStorage.getItem('isAnimationDisabled'))
      : 0,
  );
  return isAnimationDisabled;
};

export const setAnimationDisabled = (value: boolean) =>
  localStorage.setItem('isAnimationDisabled', JSON.stringify(Number(value)));
