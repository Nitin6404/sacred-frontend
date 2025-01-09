"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useTemplates } from "@/hooks/useTemplates";
import TemplatePreviewModal from "./TemplatePreviewModal";
import { Template } from "@/lib/api/template";

export default function TemplateGrid() {
  const searchParams = useSearchParams();
  const { templates, loading, error, pagination, loadTemplates, nextPage, prevPage } = useTemplates({
    fetchOnRender: true
  });

  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    const filters = Object.fromEntries(searchParams.entries());
    loadTemplates(filters);
  }, [searchParams]);

  const handleTemplateClick = (template: Template) => {
    setSelectedTemplate(template);
    setIsPreviewOpen(true);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse rounded-lg bg-gray-100 p-4">
            <div className="mb-4 h-48 rounded-md bg-gray-300"></div>
            <div className="mb-2 h-4 w-3/4 rounded bg-gray-300"></div>
            <div className="h-4 w-1/2 rounded bg-gray-300"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8 text-center text-red-500">
        {error}
        <button
          onClick={() => loadTemplates()}
          className="mt-4 rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <div
            key={template.id}
            className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-xl"
            onClick={() => handleTemplateClick(template)}
          >
            <div className="relative h-48 w-full">
              <Image
                src={template.thumbnailUrl}
                alt={template.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {template.isFeatured && (
                <div className="absolute right-2 top-2 rounded bg-yellow-500 px-2 py-1 text-sm text-white">
                  Featured
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="mb-2 text-xl font-semibold">{template.name}</h3>
              <p className="mb-4 line-clamp-2 text-gray-600">{template.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="mr-1 text-yellow-500">★</span>
                  <span>{template.rating.toFixed(1)}</span>
                  <span className="ml-2 text-sm text-gray-500">({template.views} views)</span>
                </div>
                <div className="text-sm text-gray-500">{template.languages.join(", ")}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {pagination.total > pagination.pageSize && (
        <div className="mt-8 flex justify-center">
          <nav className="inline-flex items-center gap-2" aria-label="Pagination">
            <button
              onClick={prevPage}
              disabled={!pagination.page || pagination.page === 1}
              className={`rounded px-4 py-2 transition-colors ${
                !pagination.page || pagination.page === 1
                  ? "cursor-not-allowed bg-gray-100 text-gray-400"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Previous
            </button>

            <span className="text-sm text-gray-600">
              Page {pagination.page} of {Math.ceil(pagination.total / pagination.pageSize)}
            </span>

            <button
              onClick={nextPage}
              disabled={!pagination.total || pagination.page === Math.ceil(pagination.total / pagination.pageSize)}
              className={`rounded px-4 py-2 transition-colors ${
                !pagination.total || pagination.page === Math.ceil(pagination.total / pagination.pageSize)
                  ? "cursor-not-allowed bg-gray-100 text-gray-400"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Next
            </button>
          </nav>
        </div>
      )}

      <TemplatePreviewModal
        template={selectedTemplate}
        isOpen={isPreviewOpen}
        onClose={() => {
          setIsPreviewOpen(false);
          setSelectedTemplate(null);
        }}
      />
    </div>
  );
}
