import { RefObject, useEffect, useState, useRef } from 'react';

interface Args extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

function useIntersectionObserver(
  elementRef: RefObject<Element>,
  properties: Args = {
    threshold: 0.1,
    root: null,
    rootMargin: '0%',
    freezeOnceVisible: true,
  },
): IntersectionObserverEntry | undefined {
  const { threshold, root, rootMargin, freezeOnceVisible } = properties;
  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  const observer = useRef<IntersectionObserver>();

  const frozen = entry?.isIntersecting && freezeOnceVisible;

  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    if (entry.isIntersecting && freezeOnceVisible) {
      elementRef.current && observer.current?.unobserve(elementRef.current);
      observer.current?.disconnect();
      observer.current = undefined;
    }
    setEntry(entry);
  };

  useEffect(() => {
    const node = elementRef?.current;
    const hasIOSupport = !!window.IntersectionObserver;

    if (!hasIOSupport || !node) {
      return;
    }

    const observerParams = { threshold, root, rootMargin };
    observer.current = new IntersectionObserver(updateEntry, observerParams);
    observer.current.observe(node);

    return () => {
      observer.current?.disconnect();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementRef, JSON.stringify(threshold), root, rootMargin]);

  return entry;
}

export default useIntersectionObserver;
