import axios, { AxiosError } from "axios";
import { ApiError, handleApiError } from "./error";
import { toast } from "@/components/ui/use-toast";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const apiError = new ApiError(
      error.code || "REQUEST_FAILED",
      error.message,
      error.response?.status,
      error.response?.data
    );
    return Promise.reject(handleApiError(apiError));
  }
);
