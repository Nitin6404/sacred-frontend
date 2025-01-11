import { useMutation, useQuery } from "@tanstack/react-query";
import { Template, TemplateFilters, TemplateCustomization } from "@/types";
// import { templateApi } from "@/lib/api/template";
import { templateApi } from "@/components/api/templates.endpoint";

export const useTemplateListMutation = () => {
  return useMutation({
    mutationFn: (filters: TemplateFilters) => templateApi.fetchTemplates(filters)
  });
};

export const useTemplateMutation = () => {
  return useMutation({
    mutationFn: (data: Partial<Template>) => templateApi.createTemplate(data)
  });
};

export const useTemplateCustomizationMutation = () => {
  return useMutation({
    mutationFn: (data: TemplateCustomization) => templateApi.saveTemplateCustomization(data)
  });
};

export const useTemplatePublishMutation = () => {
  return useMutation({
    mutationFn: (id: string) => templateApi.publishTemplate(id)
  });
};

export const useTemplateQuery = (id: string) => {
  return useQuery({
    queryKey: ["template", id],
    queryFn: () => templateApi.getTemplate(id)
  });
};

export const useFeaturedTemplatesQuery = () => {
  return useQuery({
    queryKey: ["featuredTemplates"],
    queryFn: () => templateApi.getFeaturedTemplates()
  });
};
