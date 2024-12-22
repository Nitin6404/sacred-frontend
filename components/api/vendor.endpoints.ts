import apiClient from "@/lib/apiConfig/apiClient";
import { vendorTypeEndpoints, authEndpoints, vendorEndpoints, vendorSubTypeEndpoints } from "@/lib/apiConfig/endpoints";

export const createVendorType = (accessToken: string, payload: any) => {
  return apiClient(vendorTypeEndpoints.createVendorType, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify(payload)
  });
};

export const getAllVendorTypes = () => {
  return apiClient(vendorTypeEndpoints.getAllVendorTypes, {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  });
};

export const removeVendorType = (accessToken: string) => {
  return apiClient(vendorTypeEndpoints.removeVendorType, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${accessToken}` }
  });
};

export const updateVendorType = (accessToken: string) => {
  return apiClient(vendorTypeEndpoints.updateVendorType, {
    method: "PUT",
    headers: { Authorization: `Bearer ${accessToken}` }
  });
};

export const registerVendor = (payload: any) => {
  return apiClient(authEndpoints.registerVendor, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" }
  });
};

export const loginVendor = (payload: any) => {
  return apiClient(authEndpoints.loginVendor, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" }
  });
};

export const vendorProfile = (accessToken: string) => {
  return apiClient(vendorEndpoints.vendorProfile, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
    }
  });
};

export const getAllVendorSubTypes = (vendorTypeUniqueIdentifier: string | number) => {
  return apiClient(
    typeof vendorTypeUniqueIdentifier === "number"
      ? vendorSubTypeEndpoints.getAllVendorSubTypesById(vendorTypeUniqueIdentifier)
      : vendorSubTypeEndpoints.getAllVendorSubTypesBySlug(vendorTypeUniqueIdentifier),
    {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    }
  );
};

export const vendorUpdateSubType = (payload: { accessToken: string; data: any }) => {
  return apiClient(vendorEndpoints.vendorUpdateSubType, {
    method: "POST",
    body: JSON.stringify(payload.data),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${payload.accessToken}`
    }
  });
};

export const searchVendors = (payload: any) => {
  return apiClient(vendorEndpoints.searchVendors, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" }
  });
};

export const updateVendor = (payload: { data: any; accessToken: string }) => {
  return apiClient(vendorEndpoints.updateVendor, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${payload.accessToken}`
    },
    body: JSON.stringify(payload.data)
  });
};
