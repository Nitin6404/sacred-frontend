"use client";

import { TemplateEditor } from "../../components/TemplateEditor";
import {
  useTemplateQuery,
  useTemplateCustomizationMutation,
  useTemplatePublishMutation
} from "@/app/_components/api/templates";
import { Loading } from "@/app/_components/loading";
import { ErrorBoundary } from "@/components/error-boundary";
import { useToast } from "@/components/ui/use-toast";
import { TemplateCustomization } from "@/types";

interface EditorProps {
  params: { templateId: string | string[] };
}

export default function EditTemplatePage({ params }: EditorProps) {
  const templateId = Array.isArray(params.templateId) ? params.templateId[0] : params.templateId;
  const { data: template, isLoading } = useTemplateQuery(templateId);
  const { mutateAsync: saveTemplate, isPending: isSaving } = useTemplateCustomizationMutation();
  const { mutateAsync: publishTemplate, isPending: isPublishing } = useTemplatePublishMutation();
  const { toast } = useToast();

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

  return (
    <ErrorBoundary>
      <TemplateEditor
        template={template}
        onSave={handleSave}
        onPublish={handlePublish}
        isSaving={isSaving}
        isPublishing={isPublishing}
      />
    </ErrorBoundary>
  );
}
