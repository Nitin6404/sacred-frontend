import { useState } from "react";
import { ApiError, handleApiError } from "@/lib/api/error";
import { ApiResponse } from "@/lib/api/types";
import { toast } from "@/components/ui/use-toast";

export function useApi<T>() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const request = async (fn: () => Promise<ApiResponse<T>>): Promise<ApiResponse<T>> => {
    try {
      setLoading(true);
      setError(null);
      const response = await fn();
      return response;
    } catch (err) {
      const apiError = handleApiError(err);
      setError(apiError);
      toast({
        title: "Error",
        description: apiError.message,
        variant: "destructive"
      });
      throw apiError;
    } finally {
      setLoading(false);
    }
  };

  return { request, loading, error };
}
