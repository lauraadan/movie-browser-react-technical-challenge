import { useState, useEffect, useCallback } from "react";

/**
 *
 * @param fetcher
 * @param deps
 */
export function useFetchData<T>(fetcher: () => Promise<T>, deps: any[] = []) {
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetcher();
      setData(result);
    } catch (e: any) {
      setError(e.message || "Something went wrong");
      setData(undefined);
    } finally {
      setLoading(false);
    }
  }, deps);

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, load };
}
