import { useEffect, useRef, useState } from 'react';
import { Box } from '@chakra-ui/react';

/**
 * Sentinel props
 */
type SentinelProps = {
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
  rootMargin?: string;
};

/**
 * Sentinel tracks end scroll for infinite loading
 * @param onLoadMore callback for loading more data
 * @param hasMore indicates if there is more data
 * @param isLoading indicates if currently loading data
 * @param (optional) rootMargin
 * @returns
 */
export const Sentinel = ({
  onLoadMore,
  hasMore,
  isLoading,
  rootMargin = '100px',
}: SentinelProps) => {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [isScrollable, setIsScrollable] = useState(false);

  // Check if container is scrollable
  const checkScrollable = () => {
    const container = document.documentElement;
    const is_scrollable = container.scrollHeight > container.clientHeight;
    setIsScrollable(is_scrollable);
    return is_scrollable;
  };

  useEffect(() => {
    const cb = () => {
      checkScrollable();
    };
    window.addEventListener('resize', cb);
    return () => window.removeEventListener('resize', cb);
  }, []);

  // Handling infinite loading
  useEffect(() => {
    if (!hasMore || isLoading) return;

    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!hasMore || isLoading) return;
          onLoadMore();
        }
      },
      {
        root: null,
        rootMargin,
        threshold: 0.1,
      },
    );

    if (sentinel) {
      observer.observe(sentinel);
    }

    if (!checkScrollable() && hasMore) {
      onLoadMore();
    }

    return () => {
      if (sentinel) {
        observer.unobserve(sentinel);
      }
    };
  }, [hasMore, isLoading, isScrollable, onLoadMore, rootMargin]);

  return <Box ref={sentinelRef} h="1px" w="100%" />;
};
