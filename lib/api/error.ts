import { toast } from "@/components/ui/use-toast";

export class ApiError extends Error {
  constructor(
    public code: string,
    message: string,
    public status?: number,
    public data?: any
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export const handleApiError = (error: unknown) => {
  if (error instanceof ApiError) {
    toast({
      title: "Error",
      description: error.message,
      variant: "destructive"
    });
    return error;
  }

  // Handle axios errors
  if (error && typeof error === "object" && "response" in error) {
    const axiosError = error as any;
    const apiError = new ApiError(
      axiosError.response?.data?.code || "API_ERROR",
      axiosError.response?.data?.message || axiosError.message,
      axiosError.response?.status
    );
    toast({
      title: "Error",
      description: apiError.message,
      variant: "destructive"
    });
    return apiError;
  }

  const defaultError = new ApiError("UNKNOWN_ERROR", "An unexpected error occurred");
  toast({
    title: "Error",
    description: defaultError.message,
    variant: "destructive"
  });
  return defaultError;
};
