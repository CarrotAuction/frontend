import React, { useEffect, useState } from 'react';

const UseLazyLoading = (imageRef: React.RefObject<HTMLImageElement> | null) => {
  const [isView, setIsView] = useState(false);

  useEffect(() => {
    if (imageRef?.current) {
      const observer = new IntersectionObserver(
        (entries: IntersectionObserverEntry[]) => {
          entries.forEach((entry: IntersectionObserverEntry) => {
            if (entry.isIntersecting) {
              setIsView(true);
            }
          });
        },
        { threshold: 0.5 },
      );
      observer.observe(imageRef.current);
      return () => observer.disconnect();
    }
    return () => undefined;
  }, [imageRef]);
  return [isView];
};

export default UseLazyLoading;
