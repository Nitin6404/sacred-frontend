import { templateEndpoints } from "@/lib/apiConfig/endpoints";
import apiClient from "@/lib/apiConfig/apiClient";
import { Template, TemplateCustomization, TemplateFilters, TemplateResponse } from "@/types";

// Template API Functions - Using apiClient for consistent error handling
export const templateApi = {
  fetchTemplates: () =>
    apiClient(templateEndpoints.list, {
      method: "GET"
    }) as Promise<TemplateResponse>,

  // Fetch templates by filters
  fetchTemplatesByFilters: (filters: TemplateFilters = {}) =>
    apiClient(templateEndpoints.list, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(filters)
    }) as Promise<TemplateResponse>,

  getTemplate: (id: string) =>
    apiClient(`${templateEndpoints.get}/${id}`, {
      method: "GET"
    }) as Promise<TemplateCustomization>,

  createTemplate: (payload: Partial<Template>) =>
    apiClient(templateEndpoints.create, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }),

  updateTemplate: (id: string, payload: TemplateCustomization) =>
    apiClient(`${templateEndpoints.update}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }),

  deleteTemplate: (id: number) =>
    apiClient(`${templateEndpoints.delete}/${id}`, {
      method: "DELETE"
    }),

  getFeaturedTemplates: () =>
    apiClient(templateEndpoints.featured, {
      method: "GET"
    }) as Promise<Template[]>,

  getTemplateCategories: () =>
    apiClient(templateEndpoints.categories, {
      method: "GET"
    }) as Promise<string[]>,

  saveTemplateCustomization: (data: TemplateCustomization) =>
    apiClient(templateEndpoints.customize, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }),

  publishTemplate: (id: string) =>
    apiClient(`${templateEndpoints.publish}/${id}`, {
      method: "POST"
    }),

  generateTemplatePDF: (templateId: number) =>
    apiClient(`${templateEndpoints.generatePDF}/${templateId}`, {
      method: "POST"
    }).then((response) => response.blob()),

  shareTemplate: (templateId: number) =>
    apiClient(`${templateEndpoints.share}/${templateId}`, {
      method: "POST"
    })
};
