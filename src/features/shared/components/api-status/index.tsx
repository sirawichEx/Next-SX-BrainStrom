'use client';

import { useGet } from '@/features/shared/hooks';

interface HelloResponse {
  message: string;
}

export function ApiStatus() {
  const { data, loading, error, refetch } = useGet<HelloResponse>('http://localhost:3000/api/hello');
  console.log("🚀 ~ ApiStatus ~ data:", data)

  return (
    <div className="text-center mt-8">
      {loading && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
          <p className="text-blue-600 text-sm">Loading API data...</p>
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md mx-auto">
          <p className="text-red-600 text-sm">{error}</p>
          <button
            onClick={refetch}
            className="mt-2 px-3 py-1 bg-red-100 text-red-700 rounded text-xs hover:bg-red-200"
          >
            Retry
          </button>
        </div>
      )}
      
      {data && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-md mx-auto">
          <p className="text-green-700 text-sm">
            <strong>API Response:</strong> {data.message}
          </p>
          <button
            onClick={refetch}
            className="mt-2 px-3 py-1 bg-green-100 text-green-700 rounded text-xs hover:bg-green-200"
          >
            Refresh
          </button>
        </div>
      )}
    </div>
  );
}
