"use client";

import { useEditorStore } from "@/lib/store/editor";
import { templates } from "../EditorCanvas/templates";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function TemplateSelector() {
  const { currentLanguage } = useEditorStore();

  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId);
    if (!template) return;

    // Use the store actions directly
    const store = useEditorStore.getState();
    store.addPage(); // This is a valid action

    // Update the page with template data
    if (template.pages.length > 0) {
      store.updatePageBackground(store.pages[0].id, template.pages[0].background || "");
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {templates.map((template) => (
        <Button
          key={template.id}
          variant="outline"
          className={cn("flex aspect-[4/3] flex-col items-center justify-center gap-2 p-4", "hover:bg-primary/5")}
          onClick={() => handleTemplateSelect(template.id)}
        >
          <div className="text-sm font-medium">{template.name}</div>
          <div className="text-xs text-muted-foreground">{template.name}</div>
        </Button>
      ))}
    </div>
  );
}
