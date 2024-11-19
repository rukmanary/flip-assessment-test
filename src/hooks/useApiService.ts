/* eslint-disable curly */
import { useCallback, useState } from 'react';

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
  const [filteredData, setFilteredData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [lastSearchQuery, setLastSearchQuery] = useState<string>('');
  const [lastSearchFunction, setLastSearchFunction] = useState<
    ((item: T, query: string) => boolean) | null
  >(null);

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
        setFilteredData(result);
      } catch (err: any) {
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
      setLastSearchQuery(query);
      setLastSearchFunction(() => searchFunction);

      if (!query) {
        setData(filteredData);
        return;
      }

      if (Array.isArray(filteredData)) {
        const lowerCaseQuery = query.toLowerCase();
        const filtered = filteredData?.filter?.(item =>
          searchFunction(item, lowerCaseQuery),
        );
        setData(filtered as T);
      }
    },
    [filteredData],
  );

  const applyFilter = useCallback(
    (filterFn?: (data: T) => T) => {
      if (!rawData) return;

      const filtered = filterFn ? filterFn(rawData) : rawData;
      setFilteredData(filtered);

      if (lastSearchQuery && lastSearchFunction && Array.isArray(filtered)) {
        const lowerCaseQuery = lastSearchQuery.toLowerCase();
        const searched = filtered.filter(item =>
          lastSearchFunction(item, lowerCaseQuery),
        );
        setData(searched as T);
      } else {
        setData(filtered);
      }
    },
    [rawData, lastSearchQuery, lastSearchFunction],
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
