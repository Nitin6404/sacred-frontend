import apiClient from "@/lib/apiConfig/apiClient";
import { blogsEndpoints } from "@/lib/apiConfig/endpoints";

export const createBlog = (payload: { accessToken: string; data: any }) => {
  return apiClient(blogsEndpoints.createBlog, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${payload.accessToken}`
    },
    body: JSON.stringify(payload.data)
  });
};

export const removeBlog = (payload: { accessToken: string; data: any }) => {
  return apiClient(blogsEndpoints.removeBlog, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${payload.accessToken}`
    },
    body: JSON.stringify(payload.data)
  });
};

export const getBlogById = (props: { slug: string }) => {
  return apiClient(`${blogsEndpoints.getBlogById}?slug=${props.slug}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  });
};

export const getAllBlogs = (props: { page: number; pageSize: number }) => {
  return apiClient(`${blogsEndpoints.getAllBlogs}?page=${props.page}&pageSize=${props.pageSize}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  });
};

export const updateBlog = (payload: { accessToken: string; data: any }) => {
  return apiClient(blogsEndpoints.updateBlog, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${payload.accessToken}`
    },
    body: JSON.stringify(payload.data)
  });
};
