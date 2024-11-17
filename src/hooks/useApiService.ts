import { useState, useCallback } from 'react';

interface UseApiServiceReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  statusCode: number | null;
  fetchAPI: (...args: any[]) => Promise<void>;
  applyFilter: (filterFn: (data: T) => T) => void;
}

const useApiService = <T>(
  apiFunction: (...args: any[]) => Promise<T>,
): UseApiServiceReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [statusCode, setStatusCode] = useState<number | null>(null);

  const fetchAPI = useCallback(
    // param from component
    async (...fetchAPIArgs: any[]) => {
      setLoading(true);
      setError(null);
      setStatusCode(null);

      try {
        const result = await apiFunction(...fetchAPIArgs);
        setData(result);
      } catch (err: any) {
        console.log({ err: err.response });
        setError(err.response?.data?.message || err.message || 'Unknown error');
        setStatusCode(err.response?.status || null);
      } finally {
        setLoading(false);
      }
    },
    [apiFunction],
  );

  const applyFilter = useCallback(
    (filterFn: (data: T) => T) => {
      if (data) {
        setData(filterFn(data));
      }
    },
    [data],
  );

  return { data, loading, error, fetchAPI, applyFilter, statusCode };
};

export default useApiService;
