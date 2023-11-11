import React, { useEffect, useState } from 'react';

const UseLazyLoading = (
  ref: React.RefObject<HTMLImageElement | HTMLElement> | null,
) => {
  const [isView, setIsView] = useState(false);

  useEffect(() => {
    if (ref?.current) {
      const observer = new IntersectionObserver(
        (entries: IntersectionObserverEntry[]) => {
          entries.forEach((entry: IntersectionObserverEntry) => {
            if (entry.isIntersecting) {
              setIsView(true);
            } else if (ref.current?.tagName === 'ARTICLE') {
              setIsView(false);
            }
          });
        },
        { threshold: 0.5 },
      );
      observer.observe(ref.current);
      return () => observer.disconnect();
    }
    return () => undefined;
  }, [isView, ref]);
  return [isView];
};

export default UseLazyLoading;
