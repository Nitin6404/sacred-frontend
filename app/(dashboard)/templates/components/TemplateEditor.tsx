"use client";

import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { Undo2, Redo2, Type } from "lucide-react";
import { useEditorStore } from "@/lib/editor";
import { DndContext } from "@dnd-kit/core";
import { DraggableElement } from "./DraggableElement";
import { LoadingSpinner } from "@/components/loading-spinner";
import {
  DEFAULT_COLORS,
  LANGUAGES,
  BENGALI_FONTS,
  ELEMENT_DEFAULTS,
  ELEMENT_TYPES,
  TEXT_ALIGNMENTS
} from "@/constants/editor";
import { useTemplateCustomizationMutation, useTemplatePublishMutation } from "@/app/_components/api/templates";

interface TemplateEditorProps {
  templateId: string;
  templateName: string;
}

export function TemplateEditor({ templateId, templateName }: TemplateEditorProps) {
  const {
    pages,
    currentPage,
    selectedElement,
    addElement,
    updateElement,
    deleteElement,
    setSelectedElement,
    setCurrentPage,
    addPage,
    deletePage,
    undo,
    redo
  } = useEditorStore();

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editedContent, setEditedContent] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<keyof typeof LANGUAGES>("en");

  const { mutateAsync: saveTemplate, isPending: isSaving } = useTemplateCustomizationMutation();
  const { mutateAsync: publishTemplate, isPending: isPublishing } = useTemplatePublishMutation();

  const handleSave = async () => {
    try {
      await saveTemplate({
        id: templateId
        // Add other template data here
      });
    } catch (error) {
      console.error("Failed to save template:", error);
    }
  };

  const handlePublish = async () => {
    try {
      await publishTemplate({
        id: templateId
        // Add other template data here
      });
    } catch (error) {
      console.error("Failed to publish template:", error);
    }
  };

  // Handle text editing
  const handleUpdateContent = useCallback(() => {
    if (!selectedElement) return;
    updateElement({
      ...selectedElement,
      content: editedContent,
      language: selectedLanguage
    });
    setIsEditDialogOpen(false);
  }, [selectedElement, editedContent, selectedLanguage, updateElement]);

  // Handle style changes
  const handleStyleChange = useCallback(
    (property: keyof EditorElement["style"], value: any) => {
      if (!selectedElement) return;
      updateElement({
        ...selectedElement,
        style: {
          ...selectedElement.style,
          [property]: value
        }
      });
    },
    [selectedElement, updateElement]
  );

  // Add new text element
  const handleAddText = useCallback(() => {
    addElement({
      type: ELEMENT_TYPES.TEXT,
      content: "New Text",
      language: selectedLanguage,
      style: {
        position: { x: 100, y: 100 },
        size: { width: ELEMENT_DEFAULTS.text.width, height: ELEMENT_DEFAULTS.text.height },
        fontSize: ELEMENT_DEFAULTS.text.fontSize,
        fontFamily: ELEMENT_DEFAULTS.text.fontFamily,
        color: DEFAULT_COLORS.text,
        backgroundColor: DEFAULT_COLORS.background
      }
    });
  }, [addElement, selectedLanguage]);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Template Title */}
      <div className="flex items-center justify-between border-b p-4">
        <h1 className="text-2xl font-bold">{templateName}</h1>
        <div className="flex gap-2">
          <Select
            value={selectedLanguage}
            onValueChange={(value: keyof typeof LANGUAGES) => setSelectedLanguage(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(LANGUAGES).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={handleAddText}>
            <Type className="mr-2 h-4 w-4" />
            Add Text
          </Button>
        </div>
      </div>

      {/* Page Navigation */}
      <div className="mb-6 flex justify-center gap-4">
        {pages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index)}
            className={cn(
              "flex items-center rounded-full px-4 py-2",
              currentPage === index ? "bg-primary text-white" : "bg-gray-100 hover:bg-gray-200"
            )}
          >
            Page {index + 1}
            <button
              className="ml-2 text-xs hover:text-red-500"
              onClick={(e) => {
                e.stopPropagation();
                deletePage(index);
              }}
            >
              ✕
            </button>
          </button>
        ))}
        <Button variant="outline" onClick={addPage} className="rounded-full px-4 py-2">
          + Add Page
        </Button>
      </div>

      {/* Styling Toolbar */}
      {selectedElement && selectedElement.type === ELEMENT_TYPES.TEXT && (
        <div className="flex items-center gap-4 border-b p-4">
          <Select
            value={selectedElement.style.fontFamily}
            onValueChange={(value: string) => handleStyleChange("fontFamily", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Font" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(selectedElement.language === "bn" ? BENGALI_FONTS : {}).map(([value, font]) => (
                <SelectItem key={value} value={value}>
                  {font.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Slider
            value={[selectedElement.style.fontSize || ELEMENT_DEFAULTS.text.fontSize]}
            onValueChange={([value]) => handleStyleChange("fontSize", value)}
            min={8}
            max={72}
            step={1}
            className="w-32"
          />
          <ColorPicker
            value={selectedElement.style.color || DEFAULT_COLORS.text}
            onChange={(value: string) => handleStyleChange("color", value)}
          />
          <Select
            value={selectedElement.style.fontWeight}
            onValueChange={(value: string) => handleStyleChange("fontWeight", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Font Weight" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="bold">Bold</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={selectedElement.style.textAlign || TEXT_ALIGNMENTS.LEFT}
            onValueChange={(value: string) => handleStyleChange("textAlign", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Text Align" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(TEXT_ALIGNMENTS).map(([label, value]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Editor Area */}
      <DndContext
        onDragEnd={({ active, over }) => {
          if (over && active.id !== over.id) {
            // Update element position
            const element = pages[currentPage].elements.find((el) => el.id === active.id);
            if (element) {
              updateElement({
                ...element,
                style: {
                  ...element.style,
                  position: {
                    x: over.rect.left - over.rect.width / 2,
                    y: over.rect.top - over.rect.height / 2
                  }
                }
              });
            }
          }
        }}
      >
        <div className="relative flex-1 bg-gray-50 p-8">
          <div
            className="relative mx-auto"
            style={{
              width: "600px",
              height: "800px",
              backgroundImage: pages[currentPage]?.background ? `url(${pages[currentPage].background})` : undefined,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundColor: DEFAULT_COLORS.background
            }}
          >
            {pages[currentPage]?.elements.map((element) => (
              <DraggableElement
                key={element.id}
                element={element}
                isSelected={selectedElement?.id === element.id}
                onSelect={() => {
                  setSelectedElement(element);
                  setEditedContent(element.content);
                }}
                onDoubleClick={() => setIsEditDialogOpen(true)}
                onDelete={() => deleteElement(element.id)}
              />
            ))}
          </div>
        </div>
      </DndContext>

      {/* Bottom Actions */}
      <div className="flex items-center justify-between border-t p-4">
        <div className="flex gap-4">
          <Button variant="outline" onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <>
                <LoadingSpinner className="mr-2 h-4 w-4" />
                Saving...
              </>
            ) : (
              "Save Draft"
            )}
          </Button>
          <Button variant="outline" onClick={redo}>
            <Redo2 className="mr-2 h-4 w-4" />
            Redo
          </Button>
          <Button variant="outline" onClick={undo}>
            <Undo2 className="mr-2 h-4 w-4" />
            Undo
          </Button>
        </div>
        <div className="flex gap-4">
          <Button variant="secondary" onClick={handlePublish} disabled={isPublishing}>
            {isPublishing ? (
              <>
                <LoadingSpinner className="mr-2 h-4 w-4" />
                Publishing...
              </>
            ) : (
              "Publish"
            )}
          </Button>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Text</DialogTitle>
          </DialogHeader>
          <Input value={editedContent} onChange={(e) => setEditedContent(e.target.value)} className="mb-4" />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateContent}>Update</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
