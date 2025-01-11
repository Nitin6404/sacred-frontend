"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ElementStyle, useEditorStore } from "@/lib/store/editor";
import { useState } from "react";
import { ChromePicker } from "react-color";
import { Bold, Italic, AlignLeft, AlignCenter, AlignRight } from "lucide-react";

const FONT_FAMILIES = [
  "Arial",
  "Times New Roman",
  "Playfair Display",
  "Great Vibes",
  "Montserrat",
  "Lato",
  "Noto Sans Bengali",
  "Noto Serif Bengali"
];

export function ElementEditor() {
  const { pages, currentPage, selectedElement, updateElementStyle } = useEditorStore();
  const [showColorPicker, setShowColorPicker] = useState(false);

  const currentElement = selectedElement ? pages[currentPage]?.elements.find((el) => el.id === selectedElement) : null;

  if (!currentElement) return null;

  const updateStyle = (style: Partial<ElementStyle>) => {
    updateElementStyle(currentPage, currentElement.id, style);
  };

  return (
    <div className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-4 rounded-lg bg-white p-4 shadow-lg">
      {/* Font Family */}
      <Select value={currentElement.style.fontFamily} onValueChange={(value) => updateStyle({ fontFamily: value })}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Font" />
        </SelectTrigger>
        <SelectContent>
          {FONT_FAMILIES.map((font) => (
            <SelectItem key={font} value={font} style={{ fontFamily: font }}>
              {font}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Font Size */}
      <div className="flex items-center gap-2">
        <Input
          type="number"
          value={currentElement.style.fontSize}
          onChange={(e) => updateStyle({ fontSize: Number(e.target.value) })}
          className="w-[70px]"
        />
      </div>

      {/* Color Picker */}
      <Popover open={showColorPicker} onOpenChange={setShowColorPicker}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[40px] p-1" style={{ backgroundColor: currentElement.style.color }} />
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <ChromePicker color={currentElement.style.color} onChange={(color) => updateStyle({ color: color.hex })} />
        </PopoverContent>
      </Popover>

      {/* Text Alignment */}
      <div className="flex gap-1">
        <Button
          variant={currentElement.style.textAlign === "left" ? "default" : "outline"}
          size="sm"
          onClick={() => updateStyle({ textAlign: "left" })}
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button
          variant={currentElement.style.textAlign === "center" ? "default" : "outline"}
          size="sm"
          onClick={() => updateStyle({ textAlign: "center" })}
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button
          variant={currentElement.style.textAlign === "right" ? "default" : "outline"}
          size="sm"
          onClick={() => updateStyle({ textAlign: "right" })}
        >
          <AlignRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Font Weight */}
      <Button
        variant={currentElement.style.fontWeight === "bold" ? "default" : "outline"}
        size="sm"
        onClick={() =>
          updateStyle({
            fontWeight: currentElement.style.fontWeight === "bold" ? "normal" : "bold"
          })
        }
      >
        <Bold className="h-4 w-4" />
      </Button>

      {/* Font Style (Italic) */}
      <Button
        variant={currentElement.style.fontStyle === "italic" ? "default" : "outline"}
        size="sm"
        onClick={() =>
          updateStyle({
            fontStyle: currentElement.style.fontStyle === "italic" ? "normal" : "italic"
          })
        }
      >
        <Italic className="h-4 w-4" />
      </Button>
    </div>
  );
}
