import { templateEndpoints } from "@/lib/apiConfig/endpoints";

export interface TemplateFilter {
  category?: string;
  languages?: string[];
  culturalElements?: string[];
  search?: string;
  isFeatured?: boolean;
  minRating?: number;
  sortBy?: "rating" | "views" | "createdAt";
  sortOrder?: "ASC" | "DESC";
  page?: number;
  pageSize?: number;
}

export interface Template {
  id: number;
  name: string;
  description: string;
  thumbnailUrl: string;
  previewImages: string[];
  category: string[];
  languages: string[];
  rating: number;
  views: number;
  isFeatured: boolean;
}

export interface TemplateResponse {
  count: number;
  rows: Template[];
}

export interface TemplateCustomization {
  templateId: number;
  pages: {
    id: string;
    elements: {
      id: string;
      type: "text" | "image";
      content: string;
      style: {
        position: { x: number; y: number };
        size: { width: number; height: number };
        rotation?: number;
        fontFamily?: string;
        fontSize?: number;
        color?: string;
        backgroundColor?: string;
        fontWeight?: string;
        fontStyle?: string;
        textDecoration?: string;
        textAlign?: string;
      };
    }[];
    background?: string;
  }[];
  music?: {
    type: "shehnai" | "rabindra_sangeet";
    url: string;
  };
}

export const fetchTemplates = (filters: TemplateFilter = {}) => {
  const queryParams = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      if (Array.isArray(value)) {
        value.forEach((v) => queryParams.append(key, v));
      } else {
        queryParams.append(key, String(value));
      }
    }
  });

  const url = `${templateEndpoints.getAllTemplates}?${queryParams.toString()}`;
  return fetch(url, { method: "GET" });
};

export const getTemplateById = (id: number) => fetch(`${templateEndpoints.getTemplateById}/${id}`, { method: "GET" });

export const createTemplate = (payload: Partial<Template>) =>
  fetch(templateEndpoints.createTemplate, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" }
  });

export const updateTemplate = (id: number, payload: Partial<Template>) =>
  fetch(`${templateEndpoints.updateTemplate}/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" }
  });

export const deleteTemplate = (id: number) => fetch(`${templateEndpoints.deleteTemplate}/${id}`, { method: "DELETE" });

export const getFeaturedTemplates = () => fetch(templateEndpoints.getFeaturedTemplates, { method: "GET" });

export const getTemplateCategories = () => fetch(templateEndpoints.getTemplateCategories, { method: "GET" });

export const saveTemplateCustomization = async (data: TemplateCustomization) => {
  const response = await fetch(templateEndpoints.saveCustomization, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error("Failed to save template");
  return response.json();
};

export const generateTemplatePDF = async (templateId: number) => {
  const response = await fetch(templateEndpoints.generatePDF.replace(":id", String(templateId)), {
    method: "GET"
  });
  if (!response.ok) throw new Error("Failed to generate PDF");
  return response.blob();
};

export const shareTemplate = async (templateId: number) => {
  const response = await fetch(templateEndpoints.share.replace(":id", String(templateId)), {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
  });
  if (!response.ok) throw new Error("Failed to share template");
  return response.json();
};
