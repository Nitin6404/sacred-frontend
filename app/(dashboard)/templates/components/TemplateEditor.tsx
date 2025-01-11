"use client";

import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Undo2, Redo2, Type, Image as ImageIcon, Layout, Palette, Save } from "lucide-react";
import { Template, TemplateCustomization } from "@/types";
import { LoadingSpinner } from "@/components/loading-spinner";
import { useToast } from "@/components/ui/use-toast";

interface TemplateEditorProps {
  template: Template;
  onSave: (data: TemplateCustomization) => Promise<void>;
  onPublish: () => Promise<void>;
  isSaving: boolean;
  isPublishing: boolean;
}

export function TemplateEditor({ template, onSave, onPublish, isSaving, isPublishing }: TemplateEditorProps) {
  const [activeTab, setActiveTab] = useState("edit");
  const [editHistory, setEditHistory] = useState<TemplateCustomization[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [customization, setCustomization] = useState<TemplateCustomization>({
    templateId: template.id,
    content: template.customization?.content || {},
    style: template.customization?.style || {},
    layout: template.customization?.layout || {}
  });
  const { toast } = useToast();

  // History management
  const addToHistory = (newState: TemplateCustomization) => {
    const newHistory = editHistory.slice(0, historyIndex + 1);
    newHistory.push(newState);
    setEditHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setCustomization(editHistory[historyIndex - 1]);
    }
  };

  const redo = () => {
    if (historyIndex < editHistory.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setCustomization(editHistory[historyIndex + 1]);
    }
  };

  // Update handlers
  const handleContentUpdate = (key: string, value: string) => {
    const newCustomization = {
      ...customization,
      content: {
        ...customization.content,
        [key]: value
      }
    };
    setCustomization(newCustomization);
    addToHistory(newCustomization);
  };

  const handleStyleUpdate = (key: string, value: any) => {
    const newCustomization = {
      ...customization,
      style: {
        ...customization.style,
        [key]: value
      }
    };
    setCustomization(newCustomization);
    addToHistory(newCustomization);
  };

  const handleLayoutUpdate = (key: string, value: any) => {
    const newCustomization = {
      ...customization,
      layout: {
        ...customization.layout,
        [key]: value
      }
    };
    setCustomization(newCustomization);
    addToHistory(newCustomization);
  };

  const handleSave = async () => {
    try {
      await onSave(customization);
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

  return (
    <div className="flex h-screen">
      {/* Editor Panel */}
      <div className="w-96 border-r bg-gray-50 p-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Edit Template</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={undo} disabled={historyIndex <= 0}>
              <Undo2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={redo} disabled={historyIndex >= editHistory.length - 1}>
              <Redo2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="content">
              <Type className="mr-2 h-4 w-4" />
              Text
            </TabsTrigger>
            <TabsTrigger value="style">
              <Palette className="mr-2 h-4 w-4" />
              Style
            </TabsTrigger>
            <TabsTrigger value="layout">
              <Layout className="mr-2 h-4 w-4" />
              Layout
            </TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-4">
            {/* Text editing fields */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={customization.content.title || ""}
                  onChange={(e) => handleContentUpdate("title", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Subtitle</label>
                <Input
                  value={customization.content.subtitle || ""}
                  onChange={(e) => handleContentUpdate("subtitle", e.target.value)}
                  className="mt-1"
                />
              </div>
              {/* Add more text fields as needed */}
            </div>
          </TabsContent>

          <TabsContent value="style" className="space-y-4">
            {/* Style controls */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Font Family</label>
                <Select
                  value={customization.style.fontFamily || ""}
                  onValueChange={(value) => handleStyleUpdate("fontFamily", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select font" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Add your font options here */}
                    <SelectItem value="bengali1">Bengali Font 1</SelectItem>
                    <SelectItem value="bengali2">Bengali Font 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Font Size</label>
                <Slider
                  value={[customization.style.fontSize || 16]}
                  min={12}
                  max={72}
                  step={1}
                  onValueChange={([value]) => handleStyleUpdate("fontSize", value)}
                />
              </div>
              {/* Add more style controls */}
            </div>
          </TabsContent>

          <TabsContent value="layout" className="space-y-4">
            {/* Layout controls */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Spacing</label>
                <Slider
                  value={[customization.layout.spacing || 0]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={([value]) => handleLayoutUpdate("spacing", value)}
                />
              </div>
              {/* Add more layout controls */}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8 flex gap-4">
          <Button className="flex-1" onClick={handleSave} disabled={isSaving}>
            {isSaving ? <LoadingSpinner className="mr-2 h-4 w-4" /> : <Save className="mr-2 h-4 w-4" />}
            Save
          </Button>
          <Button variant="secondary" className="flex-1" onClick={onPublish} disabled={isPublishing}>
            {isPublishing ? <LoadingSpinner className="mr-2 h-4 w-4" /> : "Publish"}
          </Button>
        </div>
      </div>

      {/* Preview Panel */}
      <div className="flex-1 bg-white p-8">
        <div className="mx-auto max-w-4xl rounded-lg border shadow-lg">
          {/* Template Preview */}
          <div
            className="min-h-[600px] p-8"
            style={{
              fontFamily: customization.style.fontFamily,
              fontSize: `${customization.style.fontSize}px`,
              ...customization.style
            }}
          >
            <h1 className="text-center text-3xl font-bold">{customization.content.title || template.name}</h1>
            <p className="mt-4 text-center text-xl">{customization.content.subtitle || "Add your subtitle"}</p>
            {/* Add more template elements */}
          </div>
        </div>
      </div>
    </div>
  );
}
