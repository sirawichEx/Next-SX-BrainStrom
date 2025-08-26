type FetchOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: unknown;
  cache?: RequestCache;
  revalidate?: number;
  tags?: string[];
};

export type { FetchOptions };
