"use client";

import { TemplateEditor } from "../../components/TemplateEditor";
import {
  useTemplateByIdQuery,
  useTemplateCustomizationMutation,
  useTemplatePublishMutation
} from "@/app/_components/api/templates";
import { Loading } from "@/app/_components/loading";
import { ErrorBoundary } from "@/components/error-boundary";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { TemplateCustomization } from "@/types";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface EditorProps {
  params: { templateId: string | string[] };
}

export default function EditTemplatePage({ params }: EditorProps) {
  const templateId = Array.isArray(params.templateId) ? params.templateId[0] : params.templateId;
  const { data: template, isLoading } = useTemplateByIdQuery(templateId);
  const templateData = template?.data.data;
  console.log("templateData", templateData);
  const { mutateAsync: saveTemplate, isPending: isSaving } = useTemplateCustomizationMutation();
  const { mutateAsync: publishTemplate, isPending: isPublishing } = useTemplatePublishMutation();
  const { toast } = useToast();
  const router = useRouter();

  const handleSave = async (data: TemplateCustomization) => {
    try {
      await saveTemplate({
        ...data,
        templateId
      });
      toast({
        title: "Success",
        description: "Template saved successfully"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save template",
        variant: "destructive"
      });
    }
  };

  const handlePublish = async () => {
    try {
      await publishTemplate(templateId);
      toast({
        title: "Success",
        description: "Template published successfully"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to publish template",
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return <Loading className="h-screen" />;
  }

  if (!templateData) {
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
    <ErrorBoundary>
      <TemplateEditor
        template={templateData}
        onSave={handleSave}
        onPublish={handlePublish}
        isSaving={isSaving}
        isPublishing={isPublishing}
      />
    </ErrorBoundary>
  );
}
