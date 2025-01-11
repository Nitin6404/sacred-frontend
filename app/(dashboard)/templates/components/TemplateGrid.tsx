"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Template, TemplateFilters } from "@/types";
import { templateApi } from "@/components/api/templates.endpoint";
import TemplateCard from "./TemplateCard";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/loading-spinner";
import { motion } from "framer-motion";
import TemplatePreviewModal from "./TemplatePreviewModal";

interface TemplateGridProps {
  onTemplateSelect?: (template: Template) => void;
}

export function TemplateGrid({ onTemplateSelect }: TemplateGridProps = {}) {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [filters, setFilters] = useState<TemplateFilters>({
    page: 1,
    pageSize: 12,
    sortBy: "createdAt",
    sortOrder: "desc"
  });

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["templates", filters],
    queryFn: () => templateApi.fetchTemplates()
  });

  // console.log("filters", filters);

  console.log("query result", data, isLoading, error, isFetching);

  const templates = data?.templates || [];
  const hasMore = data?.hasNextPage || false;

  const handleTemplateClick = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = templates.find((t) => t.id.toString() === templateId);
    if (template && onTemplateSelect) {
      onTemplateSelect(template);
    }
  };

  const handleLoadMore = () => {
    setFilters((prev) => ({ ...prev, page: (prev.page || 1) + 1 }));
  };

  return (
    <div className="space-y-8">
      {isLoading && !data ? (
        <LoadingSpinner className="mx-auto" />
      ) : error ? (
        <div className="text-center text-red-500">Error loading templates. Please try again.</div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {templates.map((template) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <TemplateCard template={template} onClick={() => handleTemplateClick(template.id.toString())} />
              </motion.div>
            ))}
          </div>

          {hasMore && (
            <div className="mt-8 text-center">
              <Button onClick={handleLoadMore} disabled={isFetching} variant="outline" size="lg">
                {isFetching ? (
                  <>
                    <LoadingSpinner className="mr-2 h-4 w-4" />
                    Loading...
                  </>
                ) : (
                  "Load More"
                )}
              </Button>
            </div>
          )}
        </>
      )}

      {selectedTemplate && (
        <TemplatePreviewModal
          templateId={selectedTemplate}
          isOpen={!!selectedTemplate}
          onClose={() => setSelectedTemplate(null)}
        />
      )}
    </div>
  );
}
