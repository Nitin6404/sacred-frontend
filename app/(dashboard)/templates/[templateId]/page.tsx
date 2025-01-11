"use client";

import { useQuery } from "@tanstack/react-query";
import { getTemplateById } from "@/components/api/templates.endpoint";
import { LoadingSpinner } from "@/components/loading-spinner";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

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

  console.log("params.id", params.templateId);
  console.log("templateResponse", templateResponse);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner className="h-8 w-8" />
      </div>
    );
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

  const template = templateResponse?.data.data;

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
    <div className="container mx-auto px-4 py-8">
      <Button onClick={() => router.back()} variant="outline" className="mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Templates
      </Button>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Template Preview */}
        <div className="rounded-lg bg-white p-4 shadow-lg">
          <img src={template?.thumbnailUrl} alt={template?.name} className="h-full w-full rounded-lg object-cover" />
        </div>

        {/* Template Details */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{template?.name}</h1>
          <p className="text-gray-600">{template?.description}</p>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Features</h2>
            <ul className="list-inside list-disc space-y-2">
              {template?.culturalElements?.map((element: string, index: number) => <li key={index}>{element}</li>)}
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Languages</h2>
            <div className="flex gap-2">
              {template?.languages?.map((language: string, index: number) => (
                <span key={index} className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                  {language}
                </span>
              ))}
            </div>
          </div>

          <Button className="w-full" onClick={() => router.push(`/templates/${template.id}/edit`)}>
            Customize Template
          </Button>
        </div>
      </div>
    </div>
  );
}
