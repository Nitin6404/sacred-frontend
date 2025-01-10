import { ApiError } from "./error";

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    status?: number;
    data?: any;
  };
}

export const createApiResponse = <T>(data?: T, error?: ApiError): ApiResponse<T> => {
  if (error) {
    return {
      success: false,
      error: {
        code: error.code,
        message: error.message,
        status: error.status,
        data: error.data
      }
    };
  }
  return {
    success: true,
    data
  };
};
