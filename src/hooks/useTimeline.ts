import { useEffect, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { checkIfMobileDevice } from 'utils';
import { useAnimationDisabled } from './useAnimationDisabled';
import { useMobileDevice } from './useMobileDevice';

interface TimelineBehaviour {
  enableScrollTrigger?: boolean;
  pauseOnInit?: boolean;
}

const useTimeline = (
  timelineOptions?: GSAPTimelineVars,
  behaviour: TimelineBehaviour = {},
) => {
  const { enableScrollTrigger = true, pauseOnInit = false } = behaviour;

  if (enableScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  const isAnimationDisabled = useAnimationDisabled();
  const isMobileDevice = useMobileDevice();
  const [masterTimeline, setMasterTimeline] = useState<GSAPTimeline | null>(
    null,
  );

  useEffect(() => {
    const timeline = gsap.timeline({ ...timelineOptions });
    if (pauseOnInit) timeline.pause(0);
    setMasterTimeline(timeline);
    return () => {
      timeline.kill();
      setMasterTimeline(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isMobileDevice || isAnimationDisabled) return null;
  return masterTimeline;
};

export default useTimeline;
