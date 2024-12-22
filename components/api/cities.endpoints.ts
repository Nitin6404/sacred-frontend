import apiClient from "@/lib/apiConfig/apiClient";
import { citiesEndpoints } from "@/lib/apiConfig/endpoints";

export const createCity = (payload: any) => {
  return apiClient(citiesEndpoints.createCity, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" }
  });
};

export const getAllCities = () => apiClient(citiesEndpoints.getAllCities, { method: "GET" });

export const updateCity = (payload: any) => {
  return apiClient(citiesEndpoints.updateCity, {
    method: "PUT",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" }
  });
};

export const removeCity = (id: string) => apiClient(`${citiesEndpoints.removeCity}/${id}`, { method: "DELETE" });
