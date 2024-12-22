import { bookingStatus } from "@/constants/data";
import apiClient from "@/lib/apiConfig/apiClient";
import { bookingEndpoints } from "@/lib/apiConfig/endpoints";

export const createBooking = (payload: any) => {
  return apiClient(bookingEndpoints.createBooking, {
    method: "POST",
    body: JSON.stringify({ ...payload, accessToken: null }),
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${payload.accessToken}` }
  });
};

export const getAllBookingsForAdmin = (accessToken: string) => {
  return apiClient(bookingEndpoints.getAllBookingsForAdmin, {
    method: "GET",
    headers: { Authorization: `Bearer ${accessToken}` }
  });
};

export const getAllUserBookings = (props: {
  accessToken: string;
  page: number;
  pageSize: number;
  status: bookingStatus | "";
}) => {
  return apiClient(
    bookingEndpoints.getAllUserBookings +
      `?page=${props.page}&pageSize=${props.pageSize}` +
      (props.status && props.status !== bookingStatus.NONE ? `&status=${props.status}` : ""),
    {
      method: "GET",
      headers: { Authorization: `Bearer ${props.accessToken}` }
    }
  );
};

export const getAllVendorBookings = (props: {
  accessToken: string;
  page: number;
  pageSize: number;
  status: bookingStatus | "";
}) => {
  return apiClient(
    bookingEndpoints.getAllVendorBookings +
      `?page=${props.page}&pageSize=${props.pageSize}` +
      (props.status && props.status !== bookingStatus.NONE ? `&status=${props.status}` : ""),
    {
      method: "GET",
      headers: { Authorization: `Bearer ${props.accessToken}` }
    }
  );
};

export const getBookingById = (payload: { id: string; accessToken: string }) => {
  return apiClient(`${bookingEndpoints.getBookingById}/${payload.id}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${payload.accessToken}` }
  });
};

export const updateBookingStatus = (payload: { id: number; status: string; accessToken: string }) => {
  return apiClient(bookingEndpoints.updateBooking, {
    method: "PUT",
    body: JSON.stringify({ status: payload.status, id: payload.id }),
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${payload.accessToken}` }
  });
};
