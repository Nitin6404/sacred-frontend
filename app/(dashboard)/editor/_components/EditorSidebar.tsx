"use client";

import { useEditorStore, type ElementStyle } from "@/lib/store/editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ColorPicker } from "@/components/ui/color-picker";
import { FontSelect } from "@/components/ui/font-select";
import { LanguageSelect } from "@/components/ui/language-select";
import { Copy, Trash } from "lucide-react";

export const EditorSidebar = () => {
  const { selectedElement, updateElement, deleteElement, duplicateElement } = useEditorStore();

  if (!selectedElement) return null;

  const handleStyleChange = (key: keyof ElementStyle, value: any) => {
    updateElement(selectedElement.id, {
      style: { ...selectedElement.style, [key]: value }
    });
  };

  return (
    <div className="w-80 space-y-4 border-l p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Element Properties</h3>
        <div className="space-x-2">
          <Button variant="ghost" size="icon" onClick={() => duplicateElement(selectedElement.id)}>
            <Copy className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => deleteElement(selectedElement.id)}>
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {selectedElement.type === "text" && (
        <>
          <div className="space-y-2">
            <Label>Text Content</Label>
            <Input
              value={selectedElement.content}
              onChange={(e) => updateElement(selectedElement.id, { content: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Language</Label>
            <LanguageSelect
              value={selectedElement.language || "en"}
              onChange={(value) => updateElement(selectedElement.id, { language: value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Font Family</Label>
            <FontSelect
              value={selectedElement.style.fontFamily || "inter"}
              language={selectedElement.language || "en"}
              onChange={(value) => handleStyleChange("fontFamily", value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Font Size</Label>
            <Slider
              value={[selectedElement.style.fontSize || 16]}
              min={8}
              max={72}
              step={1}
              onValueChange={([value]) => handleStyleChange("fontSize", value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Text Color</Label>
            <ColorPicker
              value={selectedElement.style.color || "#000000"}
              onChange={(value) => handleStyleChange("color", value)}
            />
          </div>
        </>
      )}

      {selectedElement.type === "shape" && (
        <div className="space-y-2">
          <Label>Background Color</Label>
          <ColorPicker
            value={selectedElement.style.backgroundColor || "#000000"}
            onChange={(value) => handleStyleChange("backgroundColor", value)}
          />
        </div>
      )}

      <div className="space-y-2">
        <Label>Position X</Label>
        <Slider
          value={[selectedElement.style.position.x]}
          min={0}
          max={794}
          step={1}
          onValueChange={([value]) => handleStyleChange("position", { ...selectedElement.style.position, x: value })}
        />
      </div>

      <div className="space-y-2">
        <Label>Position Y</Label>
        <Slider
          value={[selectedElement.style.position.y]}
          min={0}
          max={1123}
          step={1}
          onValueChange={([value]) => handleStyleChange("position", { ...selectedElement.style.position, y: value })}
        />
      </div>

      <div className="space-y-2">
        <Label>Width</Label>
        <Slider
          value={[selectedElement.style.size.width]}
          min={20}
          max={794}
          step={1}
          onValueChange={([value]) => handleStyleChange("size", { ...selectedElement.style.size, width: value })}
        />
      </div>

      <div className="space-y-2">
        <Label>Height</Label>
        <Slider
          value={[selectedElement.style.size.height]}
          min={20}
          max={1123}
          step={1}
          onValueChange={([value]) => handleStyleChange("size", { ...selectedElement.style.size, height: value })}
        />
      </div>

      <div className="space-y-2">
        <Label>Rotation</Label>
        <Slider
          value={[selectedElement.style.rotation || 0]}
          min={0}
          max={360}
          step={1}
          onValueChange={([value]) => handleStyleChange("rotation", value)}
        />
      </div>
    </div>
  );
};
