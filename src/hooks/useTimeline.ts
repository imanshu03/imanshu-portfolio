import { useEffect, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

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

  return masterTimeline;
};

export default useTimeline;
