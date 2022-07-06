import React, { useEffect, useState } from 'react';

const useIntersectionObserver = (
  ref: React.RefObject<HTMLElement>,
  { threshold = 0, root = null, rootMargin = '0%' }: IntersectionObserverInit,
): IntersectionObserverEntry | undefined => {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    setEntry(entry);
  };

  useEffect(() => {
    const element = ref.current;
    const hasIOSupport = Boolean(window.IntersectionObserver);

    if (!hasIOSupport || !element) {
      return;
    }

    const observerParams = { threshold, root, rootMargin };
    const observer = new IntersectionObserver(updateEntry, observerParams);

    observer.observe(element);

    return () => observer.disconnect();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, JSON.stringify(threshold), root, rootMargin]);

  return entry;
};

export default useIntersectionObserver;
