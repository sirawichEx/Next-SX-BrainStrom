import { FetchOptions } from "@/types/fetch.type";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export async function fetcher<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { method = 'GET', headers = {}, body, cache = 'no-store', revalidate, tags = [] } = options;

  const url = BASE_URL ? `${BASE_URL}${endpoint}` : endpoint;

  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    cache,
  };

  if (body && method !== 'GET') {
    config.body = JSON.stringify(body);
  }

  if (revalidate !== undefined || tags.length > 0) {
    config.next = {
      revalidate,
      tags: tags.length > 0 ? tags : undefined,
    };
  }

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      let errorData: { message?: string };
      try {
        errorData = await response.json();
      } catch {
        errorData = { message: 'Unknown error occurred' };
      }

      throw new ApiError(
        errorData.message || `HTTP ${response.status}: ${response.statusText}`,
        response.status,
        errorData,
      );
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }

    return (await response.text()) as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(error instanceof Error ? error.message : 'Network error occurred', 0, error);
  }
}

export const api = {
  get: <T>(endpoint: string, options?: Omit<FetchOptions, 'method'>) =>
    fetcher<T>(endpoint, { ...options, method: 'GET' }),

  post: <T>(endpoint: string, body?: unknown, options?: Omit<FetchOptions, 'method' | 'body'>) =>
    fetcher<T>(endpoint, { ...options, method: 'POST', body }),

  put: <T>(endpoint: string, body?: unknown, options?: Omit<FetchOptions, 'method' | 'body'>) =>
    fetcher<T>(endpoint, { ...options, method: 'PUT', body }),

  delete: <T>(endpoint: string, options?: Omit<FetchOptions, 'method'>) =>
    fetcher<T>(endpoint, { ...options, method: 'DELETE' }),

  patch: <T>(endpoint: string, body?: unknown, options?: Omit<FetchOptions, 'method' | 'body'>) =>
    fetcher<T>(endpoint, { ...options, method: 'PATCH', body }),
};

