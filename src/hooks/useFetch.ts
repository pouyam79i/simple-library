import { useState, useEffect } from 'react';

/**
 * Contains fetched data and its status
 */
type FetchState<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
};

/**
 * Generalized hook for fetching data
 * @param url api address to fetch data from
 * @returns fetch state contains data and fetch status
 */
export const useFetch = <T>(url: string): FetchState<T> => {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(response.statusText);

        const data: T = await response.json();
        setState({ data, loading: false, error: null });
      } catch (error) {
        setState({ data: null, loading: false, error: error as Error });
      }
    };

    fetchData();
  }, [url]);

  return state;
};
