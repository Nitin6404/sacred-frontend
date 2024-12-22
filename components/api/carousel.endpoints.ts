import apiClient from "@/lib/apiConfig/apiClient";
import { sliderEndpoints } from "@/lib/apiConfig/endpoints";

export const getSlider = () => apiClient(sliderEndpoints.getAllCarousels, { method: "GET" });
