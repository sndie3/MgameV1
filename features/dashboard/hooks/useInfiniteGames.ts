//hooks
import { useState, useRef, useCallback, useEffect } from 'react';
import type { GameProvider } from '../providers/GameProvider';
import { generateGameLayouts } from '../utils/layoutGenerator';
import type { LayoutGroup, LayoutPattern } from '../utils/layoutGenerator';

export function useInfiniteGames(provider: GameProvider, limit: number = 21) {
  const [layouts, setLayouts] = useState<LayoutGroup[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const cursorRef = useRef<string | null>(null);
  const isFetchingRef = useRef(false);
  const lastLayoutRef = useRef<LayoutPattern | null>(null);

  const loadMore = useCallback(async () => {
    if (isFetchingRef.current || !hasMore) return;

    isFetchingRef.current = true;
    setIsLoading(true);
    setError(null);

    try {
      const response = await provider.getGames({
        cursor: cursorRef.current || undefined,
        limit
      });

      const newLayouts = generateGameLayouts(response.data, lastLayoutRef.current);
      
      if (newLayouts.length > 0) {
        lastLayoutRef.current = newLayouts[newLayouts.length - 1].layout;
      }

      setLayouts(prev => [...prev, ...newLayouts]);
      cursorRef.current = response.nextCursor;
      setHasMore(response.nextCursor !== null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      console.error("Failed to fetch games:", err);
    } finally {
      setIsLoading(false);
      isFetchingRef.current = false;
    }
  }, [provider, limit, hasMore]);

  // Initial load
  useEffect(() => {
    if (layouts.length === 0 && hasMore && !isFetchingRef.current) {
      loadMore();
    }
  }, [loadMore, layouts.length, hasMore]);

  return {
    layouts,
    isLoading,
    hasMore,
    error,
    loadMore
  };
}