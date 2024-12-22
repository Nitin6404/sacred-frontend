import apiClient from "@/lib/apiConfig/apiClient";
import { VendorType } from "@/types/auth.types";
import { useQuery } from "@tanstack/react-query";

const baseUrl = "/api/v1";
const endpoints = {
  getVendorTypes: "/vendor-type/all"
};

export function useGetVendorTypesQuery() {
  return useQuery<{ data: VendorType[]; message: string; status: number }>({
    queryKey: ["getVendorTypes"],
    queryFn: () => apiClient(baseUrl + endpoints.getVendorTypes, { method: "GET" })
  });
}
