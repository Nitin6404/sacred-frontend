import { Metadata } from "next";
import { TemplateSelector } from "./_components/TemplateSelector";
import { EditorCanvas } from "./_components/EditorCanvas/EditorCanvas";
import { CustomizationPanel } from "./_components/CustomizationPanel";

export const metadata: Metadata = {
  title: "Template Editor - Sacred Shadi",
  description: "Customize your wedding invitation template"
};

export default function EditorPage() {
  return (
    <div className="flex h-full">
      <div className="w-64 border-r">
        <TemplateSelector />
      </div>
      <div className="flex-1">
        <EditorCanvas />
      </div>
      <div className="w-80 border-l">
        <CustomizationPanel />
      </div>
    </div>
  );
}
