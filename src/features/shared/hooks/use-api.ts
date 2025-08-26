import { useCallback, useState } from 'react';

import { ApiError, api } from '@/libs/api';
import { FetchOptions } from '@/types/fetch.type';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useApi<T>() {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(async (...args: Parameters<typeof api.get>) => {
    setState((prev: UseApiState<T>) => ({ ...prev, loading: true, error: null }));

    try {
      const data = await api.get<T>(...args);
      setState({ data, loading: false, error: null });
    } catch (err) {
      const errorMessage =
        err instanceof ApiError
          ? `API Error (${err.status}): ${err.message}`
          : 'An unexpected error occurred';

      setState({ data: null, loading: false, error: errorMessage });
      console.error('API Error:', err);
    }
  }, []);

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}

export function useGet<T>(endpoint: string, options?: Omit<FetchOptions, 'method'>) {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const execute = useCallback(async () => {
    setState((prev: UseApiState<T>) => ({ ...prev, loading: true, error: null }));

    try {
      const data = await api.get<T>(endpoint, options);
      setState({ data, loading: false, error: null });
    } catch (err) {
      const errorMessage =
        err instanceof ApiError
          ? `API Error (${err.status}): ${err.message}`
          : 'An unexpected error occurred';

      setState({ data: null, loading: false, error: errorMessage });
      console.error('API Error:', err);
    }
  }, [endpoint, options]);

  return { ...state, execute, refetch: execute };
}
