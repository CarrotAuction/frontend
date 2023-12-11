import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { CommentType, ProductInfoType } from '../types/auctionDetail';

type Props = {
  ref: React.MutableRefObject<HTMLDivElement | null>;
  refetchScroll: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<ProductInfoType>>;
  refetch: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<ProductInfoType>>;
  comment: CommentType[];
  totalComments?: number | undefined;
};

export const useObserver = ({
  ref,
  refetchScroll,
  refetch,
  comment,
  totalComments,
}: Props) => {
  const [isView, setIsView] = useState(false);
  useEffect(() => {
    if (ref?.current) {
      const observer = new IntersectionObserver(
        (entries: IntersectionObserverEntry[]) => {
          entries.forEach((entry: IntersectionObserverEntry) => {
            if (entry.isIntersecting) {
              setIsView(true);
            } else {
              setIsView(false);
            }
          });
        },
        { threshold: 0.5 },
      );
      ref?.current && observer.observe(ref.current);
      return () => observer.disconnect();
    }

    return () => undefined;
  }, [isView, ref?.current]);

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (isView) {
      const cursor = String(comment?.length);
      if (totalComments && +cursor > totalComments) return;
      refetchScroll();
    }
  }, [isView]);

  return [isView];
};
