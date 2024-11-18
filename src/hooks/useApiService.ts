import { useState, useCallback } from 'react';

interface UseApiServiceReturn<T> {
  data: T | null;
  rawData: T | null;
  loading: boolean;
  error: string | null;
  statusCode: number | null;
  fetchAPI: (...args: any[]) => Promise<void>;
  applyFilter: (filterFn?: (data: T) => T) => void;
  search: (
    query: string,
    searchFn: (item: T, query: string) => boolean,
  ) => void;
}

const useApiService = <T>(
  apiFunction: (...args: any[]) => Promise<T>,
): UseApiServiceReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [rawData, setRawData] = useState<T | null>(null);
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
        setRawData(result);
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

  const search = useCallback(
    (query: string, searchFunction: (item: T, query: string) => boolean) => {
      if (!query) {
        setData(rawData);
        return;
      }

      if (Array.isArray(rawData)) {
        const lowerCaseQuery = query.toLowerCase();
        const filtered = rawData?.filter?.(item =>
          searchFunction(item, lowerCaseQuery),
        );
        setData(filtered as T);
      }
    },
    [rawData],
  );

  const applyFilter = useCallback(
    (filterFn?: (data: T) => T) => {
      if (rawData) {
        setData(filterFn ? filterFn(rawData) : rawData);
      }
    },
    [rawData],
  );

  return {
    data,
    rawData,
    loading,
    error,
    fetchAPI,
    applyFilter,
    statusCode,
    search,
  };
};

export default useApiService;
