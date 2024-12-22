import apiClient from "@/lib/apiConfig/apiClient";
import { functionsEndpoints } from "@/lib/apiConfig/endpoints";

export const createFunction = (payload: any) => {
  return apiClient(functionsEndpoints.createFunction, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${payload.accessToken}` }
  });
};

export const updateFunction = (payload: any) => {
  return apiClient(functionsEndpoints.updateFunction, {
    method: "PUT",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${payload.accessToken}` }
  });
};

export const removeFunction = (id: string) => {
  return apiClient(`${functionsEndpoints.removeFunction}/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
  });
};

export const getAllFunctions = (accessToken: string) => {
  return apiClient(functionsEndpoints.getAllFunctions, {
    method: "GET",
    headers: { Authorization: `Bearer ${accessToken}` }
  });
};

export const getAllVendorFunctions = (accessToken: string) => {
  return apiClient(functionsEndpoints.getAllVendorFunctions, {
    method: "GET",
    headers: { Authorization: `Bearer ${accessToken}` }
  });
};

export const getFunctionById = (payload: { accessToken: string; id: string }) => {
  return apiClient(`${functionsEndpoints.getFunctionById}/${payload.id}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${payload.accessToken}` }
  });
};
