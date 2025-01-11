"use client";

import { useQuery } from "@tanstack/react-query";
import { getTemplateById } from "@/components/api/templates.endpoint";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft, Pencil } from "lucide-react";
import { Loading } from "@/app/_components/loading";
import React from "react";
import { cn } from "@/lib/utils";

interface TemplatePageProps {
  params: {
    templateId: string;
  };
}

export default function TemplatePage({ params }: TemplatePageProps) {
  const router = useRouter();
  const {
    data: templateResponse,
    isLoading,
    error
  } = useQuery({
    queryKey: ["template", params.templateId],
    queryFn: () => getTemplateById(params.templateId)
  });

  const template = templateResponse?.data.data;
  const [currentPage, setCurrentPage] = React.useState(1);
  const totalPages = (template?.previewImages?.length || 0) + 1;

  if (!template?.previewImages?.length) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <p className="text-lg text-red-500">Template has no preview images</p>
        <Button onClick={() => router.back()} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </Button>
      </div>
    );
  }

  const getPageImage = () => {
    if (currentPage === 1) {
      return template?.thumbnailUrl;
    }
    return template?.previewImages?.[currentPage - 2] || template?.thumbnailUrl;
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <p className="text-lg text-red-500">Error loading template. Please try again.</p>
        <Button onClick={() => router.back()} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </Button>
      </div>
    );
  }

  if (!template) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <p className="text-lg text-red-500">Template not found</p>
        <Button onClick={() => router.back()} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col">
      <div className="flex items-center justify-between border-b px-4 py-4">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Templates
        </Button>
        <Button onClick={() => router.push(`/templates/${params.templateId}/edit`)}>
          <Pencil className="mr-2 h-4 w-4" />
          Customize Template
        </Button>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center bg-gray-50 p-8">
        <div className="relative mb-8 overflow-hidden rounded-lg shadow-lg">
          <img
            src={getPageImage()}
            alt={`Template preview page ${currentPage}`}
            className="h-auto max-h-[70vh] w-auto"
          />
        </div>

        {/* Page Navigation */}
        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={cn(
                "h-2 w-2 rounded-full transition-all",
                currentPage === index + 1 ? "w-4 bg-primary" : "bg-gray-300 hover:bg-gray-400"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
