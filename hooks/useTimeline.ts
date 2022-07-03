import { useEffect, useState } from 'react';
import gsap from 'gsap';

const useTimeline = (
  timelineOptions?: GSAPTimelineVars,
  pauseOnInit: boolean = true,
) => {
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
