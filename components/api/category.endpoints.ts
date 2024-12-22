import apiClient from "@/lib/apiConfig/apiClient";

import { categoryEndpoints } from "@/lib/apiConfig/endpoints";

export const createCategory = (payload: any) => {
  return apiClient(categoryEndpoints.createCategory, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" }
  });
};

export const updateCategory = (payload: any) => {
  return apiClient(categoryEndpoints.updateCategory, {
    method: "PUT",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" }
  });
};

export const removeCategory = (id: string) => {
  return apiClient(`${categoryEndpoints.removeCategory}/${id}`, {
    method: "DELETE"
  });
};

export const getAllCategories = (accessToken: string) => {
  return apiClient(categoryEndpoints.getAllCategories, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
    }
  });
};
