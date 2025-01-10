"use client";

import { useEditorStore } from "@/lib/store/editor";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HexColorPicker } from "react-colorful";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Language } from "@/types/editor";

const fontFamilies = [
  { value: "inter", label: "Inter" },
  { value: "noto-sans-bengali", label: "Noto Sans Bengali" }
];

const fontSizes = [
  { value: "12", label: "12px" },
  { value: "14", label: "14px" },
  { value: "16", label: "16px" },
  { value: "18", label: "18px" },
  { value: "20", label: "20px" },
  { value: "24", label: "24px" },
  { value: "32", label: "32px" },
  { value: "48", label: "48px" }
];

const alignments = [
  { value: "left", label: "Left" },
  { value: "center", label: "Center" },
  { value: "right", label: "Right" }
];

type ElementStyle = {
  fontFamily: string;
  fontSize: number;
  color: string;
  textAlign: "left" | "center" | "right";
};

export function TextCustomization() {
  const { selectedElement, updateElement, currentLanguage, updateElementTranslation } = useEditorStore();
  const [color, setColor] = useState(selectedElement?.style.color || "#000000");

  if (!selectedElement || selectedElement.type !== "text") {
    return null;
  }

  const handleStyleChange = (property: keyof ElementStyle, value: string | number) => {
    updateElement(selectedElement.id, {
      style: {
        ...selectedElement.style,
        [property]: value
      }
    });
  };

  const handleContentChange = (content: string) => {
    updateElementTranslation(selectedElement.id, currentLanguage, content);
  };

  const currentContent = selectedElement.translations?.[currentLanguage] || selectedElement.content;

  return (
    <div className="space-y-4 p-4">
      <div className="space-y-2">
        <Label>Text Content ({currentLanguage.toUpperCase()})</Label>
        <Input
          value={currentContent}
          onChange={(e) => handleContentChange(e.target.value)}
          placeholder={`Enter text in ${currentLanguage === "en" ? "English" : "Bengali"}...`}
          className={currentLanguage === "bn" ? "font-bengali" : ""}
        />
      </div>

      <div className="space-y-2">
        <Label>Font Family</Label>
        <Select
          value={selectedElement.style.fontFamily}
          onValueChange={(value) => handleStyleChange("fontFamily", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select font" />
          </SelectTrigger>
          <SelectContent>
            {fontFamilies.map((font) => (
              <SelectItem key={font.value} value={font.value}>
                {font.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Font Size</Label>
        <Select
          value={String(selectedElement.style.fontSize)}
          onValueChange={(value) => handleStyleChange("fontSize", Number(value))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select size" />
          </SelectTrigger>
          <SelectContent>
            {fontSizes.map((size) => (
              <SelectItem key={size.value} value={size.value}>
                {size.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Text Color</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start" style={{ color }}>
              <div className="mr-2 h-4 w-4 rounded" style={{ backgroundColor: color }} />
              {color}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <HexColorPicker
              color={color}
              onChange={(newColor) => {
                setColor(newColor);
                handleStyleChange("color", newColor);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <Label>Text Alignment</Label>
        <Select
          value={selectedElement.style.textAlign}
          onValueChange={(value: "left" | "center" | "right") => handleStyleChange("textAlign", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select alignment" />
          </SelectTrigger>
          <SelectContent>
            {alignments.map((alignment) => (
              <SelectItem key={alignment.value} value={alignment.value}>
                {alignment.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
