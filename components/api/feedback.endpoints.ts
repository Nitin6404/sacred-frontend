import apiClient from "@/lib/apiConfig/apiClient";
import { feedbackEndpoints } from "@/lib/apiConfig/endpoints";

type mutationReqType = { accessToken: string; data: any };

export const getAllUserFeedbacks = (accessToken: string) => {
  return apiClient(feedbackEndpoints.getAllUserFeedbacks, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
    }
  });
};

export const getAllVendorFeedbacks = (props: { vendorId: number; page: number; pageSize: number }) => {
  return apiClient(
    `${feedbackEndpoints.getAllVendorFeedbacks}/${props.vendorId}?page=${props.page}&pageSize=${props.pageSize}`,
    { method: "GET", headers: { "Content-Type": "application/json" } }
  );
};

export const getAllFeedbacks = (accessToken: string) => {
  return apiClient(feedbackEndpoints.getAllFeedbacks, {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` }
  });
};

export const updateFeedback = (payload: mutationReqType) => {
  return apiClient(feedbackEndpoints.updateFeedback, {
    method: "PUT",
    body: JSON.stringify(payload.data),
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${payload.accessToken}` }
  });
};

export const removeFeedback = (payload: mutationReqType) => {
  return apiClient(feedbackEndpoints.removeFeedback, {
    method: "DELETE",
    body: JSON.stringify(payload.data),
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${payload.accessToken}` }
  });
};

export const createFeedback = (payload: mutationReqType) => {
  return apiClient(feedbackEndpoints.createFeedback, {
    method: "POST",
    body: JSON.stringify(payload.data),
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${payload.accessToken}` }
  });
};
