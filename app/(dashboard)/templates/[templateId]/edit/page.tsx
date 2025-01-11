"use client";

import { TemplateEditor } from "@/app/_components/template-editor";
import { AuthPromptDialog } from "../../components/AuthPromptDialog";
import {
  useTemplateByIdQuery,
  useTemplateCustomizationMutation,
  useTemplatePublishMutation
} from "@/app/_components/api/templates";
import { Loading } from "@/app/_components/loading";
import { ErrorBoundary } from "@/components/error-boundary";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUserStore } from "@/app/context/user-context";
import { useEditorStore } from "@/lib/store/editor";

interface EditorProps {
  params: { templateId: string | string[] };
}

export default function EditTemplatePage({ params }: EditorProps) {
  const templateId = Array.isArray(params.templateId) ? params.templateId[0] : params.templateId;
  const { data: template, isLoading } = useTemplateByIdQuery(templateId);
  const templateData = template?.data.data;
  const { mutateAsync: saveTemplate, isPending: isSaving } = useTemplateCustomizationMutation();
  const { mutateAsync: publishTemplate, isPending: isPublishing } = useTemplatePublishMutation();
  const { toast } = useToast();
  const router = useRouter();
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const { user } = useUserStore();
  const { pages } = useEditorStore();

  useEffect(() => {
    if (!user) {
      setShowAuthPrompt(true);
    }
  }, [user]);

  const handleSave = async () => {
    if (!user) {
      setShowAuthPrompt(true);
      return;
    }

    try {
      await saveTemplate({
        pages,
        templateId
      });
      toast({
        title: "Success",
        description: "Template saved successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save template",
        variant: "destructive"
      });
    }
  };

  const handlePublish = async () => {
    if (!user) {
      setShowAuthPrompt(true);
      return;
    }

    try {
      await publishTemplate(templateId);
      toast({
        title: "Success",
        description: "Template published successfully"
      });
      router.push(`/templates/${templateId}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to publish template",
        variant: "destructive"
      });
    }
  };

  if (isLoading || !templateData) {
    return <Loading />;
  }

  return (
    <ErrorBoundary>
      <div className="flex h-screen flex-col">
        <div className="flex items-center justify-between border-b px-4 py-4">
          <Button variant="ghost" onClick={() => router.push(`/templates/${templateId}`)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Preview
          </Button>
        </div>

        <div className="flex-1">
          <TemplateEditor
            template={templateData}
            onSave={handleSave}
            onPublish={handlePublish}
            isSaving={isSaving}
            isPublishing={isPublishing}
          />
        </div>
      </div>

      <AuthPromptDialog open={showAuthPrompt} onOpenChange={setShowAuthPrompt} />
    </ErrorBoundary>
  );
}
