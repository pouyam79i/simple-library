import { useState, useEffect, useCallback, useMemo } from 'react';

/**
 * Contains fetched data and its status
 */
type FetchState<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
};

/**
 * Generates query params into a string to use it inside a url
 * @param params query params
 * @returns generated query parameter
 */
const createQueryString = (params: Record<string, string>): string => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    searchParams.set(key, typeof value === 'object' ? JSON.stringify(value) : value.toString());
  });

  return searchParams.toString();
};

/**
 * Generalized hook for fetching data
 * @param baseUrl api address to fetch data from
 * @param params query params
 * @returns fetch state contains data and fetch status
 */
export const useFetch = <T>(baseUrl: string, params: Record<string, string> = {}) => {
  const queryString = useMemo(() => createQueryString(params), [params]);
  const url = useMemo(() => `${baseUrl}?${queryString}`, [baseUrl, queryString]);
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, loading: true }));

      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data: T = await response.json();
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState({ data: null, loading: false, error: error as Error });
    }
  }, [url]);

  // cache result
  const cachedFetch = useMemo(() => fetchData, [fetchData]);

  useEffect(() => {
    cachedFetch();
  }, [cachedFetch]);

  return {
    ...state,
    refetch: cachedFetch,
  };
};
