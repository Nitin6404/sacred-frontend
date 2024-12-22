import apiClient from "@/lib/apiConfig/apiClient";
import { LoginUser, RegisterUser } from "@/types/auth.types";
import { authEndpoints, userEndpoints } from "@/lib/apiConfig/endpoints";

export const registerUser = (payload: RegisterUser) => {
  return apiClient(authEndpoints.registerUser, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" }
  });
};

export const loginUser = (payload: LoginUser) => {
  return apiClient(authEndpoints.loginUser, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" }
  });
};

export const getUserProfile = (accessToken: string) => {
  return apiClient(userEndpoints.userProfile, {
    method: "GET",
    headers: { Authorization: `Bearer ${accessToken}` }
  });
};

export const removeUser = (accessToken: string) => {
  return apiClient(userEndpoints.removeUser, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${accessToken}` }
  });
};
