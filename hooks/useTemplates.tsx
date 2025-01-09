import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Template, TemplateFilter, fetchTemplates } from "@/lib/api/template";

export const useTemplates = (options?: { fetchOnRender?: boolean }) => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 12,
    total: 0
  });

  const isNextPageAvailable = pagination.page < Math.ceil(pagination.total / pagination.pageSize);
  const isPrevPageAvailable = pagination.page > 1;

  const loadTemplates = async (filters: TemplateFilter = {}) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetchTemplates({
        page: pagination.page,
        pageSize: pagination.pageSize,
        ...filters
      });

      if (response.status === "success" && response.data) {
        setTemplates(response.data.rows);
        setPagination((prev) => ({
          ...prev,
          total: response.data.count
        }));
      } else {
        throw new Error("Failed to load templates");
      }
    } catch (err: any) {
      const msg = err.error || err.message || "Failed to load templates";
      setError(msg);
      toast({
        title: "Error",
        description: msg,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const nextPage = async () => {
    if (isNextPageAvailable) {
      setPagination((prev) => ({ ...prev, page: prev.page + 1 }));
      await loadTemplates();
    }
  };

  const prevPage = async () => {
    if (isPrevPageAvailable) {
      setPagination((prev) => ({ ...prev, page: prev.page - 1 }));
      await loadTemplates();
    }
  };

  const setPageSize = async (newSize: number) => {
    setPagination((prev) => ({ ...prev, pageSize: newSize, page: 1 }));
    await loadTemplates();
  };

  const applyFilters = async (filters: TemplateFilter) => {
    setPagination((prev) => ({ ...prev, page: 1 }));
    await loadTemplates(filters);
  };

  return {
    templates,
    loading,
    error,
    pagination,
    isNextPageAvailable,
    isPrevPageAvailable,
    loadTemplates,
    nextPage,
    prevPage,
    setPageSize,
    applyFilters
  };
};
