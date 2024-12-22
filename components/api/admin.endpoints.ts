import apiClient from "@/lib/apiConfig/apiClient";
import { authEndpoints } from "@/lib/apiConfig/endpoints";
import { LoginUser } from "@/types/auth.types";

export const loginAdmin = (payload: LoginUser) => {
  return apiClient(authEndpoints.loginSuperAdmin, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" }
  });
};
