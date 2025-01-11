import { useMutation, useQuery } from "@tanstack/react-query";
import { Template, TemplateFilters, TemplateCustomization } from "@/types";
// import { templateApi } from "@/lib/api/template";
import { getTemplateById, templateApi } from "@/components/api/templates.endpoint";
import { useUserStore } from "@/app/context/user-context";

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
  const userStore = useUserStore();
  const accessToken = userStore.user?.tokens.accessToken;
  if (!accessToken) throw new Error("No access token found");
  return useMutation({
    mutationFn: (data: TemplateCustomization) => templateApi.saveTemplateCustomization(accessToken, data)
  });
};

export const useTemplatePublishMutation = () => {
  return useMutation({
    mutationFn: (id: string) => templateApi.publishTemplate(id)
  });
};

export const useTemplateByIdQuery = (id: string) => {
  return useQuery({
    queryKey: ["template", id],
    queryFn: () => getTemplateById(id)
  });
};

export const useFeaturedTemplatesQuery = () => {
  return useQuery({
    queryKey: ["featuredTemplates"],
    queryFn: () => templateApi.getFeaturedTemplates()
  });
};
