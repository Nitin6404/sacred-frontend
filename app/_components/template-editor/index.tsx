"use client";

import { EditorPage, TextElement, useEditorStore } from "@/lib/store/editor";
import { Template } from "@/types";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { CoupleDetails } from "./components/CoupleDetails";
import { EditorToolbar } from "./components/EditorToolbar";
import { EventDetails } from "./components/EventDetails";
import { InvitationMessage } from "./components/InvitationMessage";
import { TemplatePreview } from "./components/TemplatePreview";

interface TemplateEditorProps {
  template: Template;
  onSave: () => void;
  onPublish: () => void;
  isSaving?: boolean;
  isPublishing?: boolean;
}

export function TemplateEditor({
  template,
  onSave,
  onPublish,
  isSaving = false,
  isPublishing = false
}: TemplateEditorProps) {
  const { setPages, setCurrentPage } = useEditorStore();

  useEffect(() => {
    // Initialize the editor with template data or create default elements
    const initialPages: EditorPage[] =
      template.previewImages?.map((image, index) => ({
        id: uuidv4(),
        elements: [
          {
            id: `bride_${index}`,
            type: "text",
            content: "",
            style: {
              position: { x: 200, y: 300 },
              size: { width: 400, height: 40 },
              fontFamily: "Arial",
              fontSize: 24,
              color: "#000000",
              textAlign: "center"
            }
          },
          {
            id: `brideParents_${index}`,
            type: "text",
            content: "",
            style: {
              position: { x: 200, y: 350 },
              size: { width: 400, height: 30 },
              fontFamily: "Arial",
              fontSize: 16,
              color: "#666666",
              textAlign: "center"
            }
          },
          {
            id: `groom_${index}`,
            type: "text",
            content: "",
            style: {
              position: { x: 200, y: 400 },
              size: { width: 400, height: 40 },
              fontFamily: "Arial",
              fontSize: 24,
              color: "#000000",
              textAlign: "center"
            }
          },
          {
            id: `groomParents_${index}`,
            type: "text",
            content: "",
            style: {
              position: { x: 200, y: 450 },
              size: { width: 400, height: 30 },
              fontFamily: "Arial",
              fontSize: 16,
              color: "#666666",
              textAlign: "center"
            }
          },
          {
            id: `date_${index}`,
            type: "text",
            content: "",
            style: {
              position: { x: 200, y: 500 },
              size: { width: 400, height: 30 },
              fontFamily: "Arial",
              fontSize: 18,
              color: "#000000",
              textAlign: "center"
            }
          },
          {
            id: `venue_${index}`,
            type: "text",
            content: "",
            style: {
              position: { x: 150, y: 550 },
              size: { width: 500, height: 60 },
              fontFamily: "Arial",
              fontSize: 16,
              color: "#000000",
              textAlign: "center"
            }
          },
          {
            id: `message_${index}`,
            type: "text",
            content: "",
            style: {
              position: { x: 100, y: 650 },
              size: { width: 600, height: 120 },
              fontFamily: "Arial",
              fontSize: 16,
              color: "#000000",
              textAlign: "center"
            }
          }
        ] as TextElement[],
        background: image,
        order: index
      })) || [];

    setPages(
      initialPages.length
        ? initialPages
        : [
            {
              id: uuidv4(),
              elements: [],
              background: template.thumbnailUrl,
              order: 0
            }
          ]
    );
    setCurrentPage(0);
  }, [template, setPages, setCurrentPage]);

  return (
    <div className="flex h-full">
      {/* Editor Panel */}
      <div className="w-80 space-y-8 overflow-y-auto border-r bg-background p-4">
        <CoupleDetails />
        <EventDetails />
        <InvitationMessage />
      </div>

      {/* Preview Area */}
      <div className="flex flex-1 flex-col">
        <EditorToolbar onSave={onSave} onPublish={onPublish} isSaving={isSaving} isPublishing={isPublishing} />
        <div className="flex-1">
          <TemplatePreview />
        </div>
      </div>
    </div>
  );
}
