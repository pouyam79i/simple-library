import axios, { AxiosRequestConfig } from 'axios';
import { useState, useEffect, useCallback, useMemo } from 'react';

/**
 * Contains fetched data and its status
 */
type FetchState<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
  triggerFetch: () => void;
};

/**
 * Generalized hook for fetching data / get request
 * @param baseUrl api address to fetch data from
 * @param config axios configuration
 * @returns data and fetch status
 */
export const useFetch = <T>(baseUrl: string, config: AxiosRequestConfig = {}): FetchState<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();
    axios
      .get<T>(baseUrl, { ...config, signal: controller.signal })
      .then((res) => {
        setError(null);
        setLoading(false);
        setData(res.data);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
        setData(null);
      });

    return () => controller.abort();
  }, [trigger]);

  return {
    data,
    loading,
    error,
    triggerFetch: () => {
      if (!loading) setTrigger(!trigger);
    },
  };
};
