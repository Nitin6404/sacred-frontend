"use client";

import { useEditorStore } from "@/lib/store/editor";
import { Label } from "@/components/ui/label";
import { HexColorPicker } from "react-colorful";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function ShapeCustomization() {
  const { selectedElement, updateElement } = useEditorStore();
  const [backgroundColor, setBackgroundColor] = useState(selectedElement?.style.backgroundColor || "#000000");

  if (!selectedElement || selectedElement.type !== "shape") {
    return null;
  }

  const handleStyleChange = (property: string, value: string | number) => {
    updateElement(selectedElement.id, {
      style: {
        ...selectedElement.style,
        [property]: value
      }
    });
  };

  return (
    <div className="space-y-4 p-4">
      <div className="space-y-2">
        <Label>Background Color</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start" style={{ backgroundColor }}>
              <div className="mr-2 h-4 w-4 rounded" style={{ backgroundColor }} />
              {backgroundColor}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <HexColorPicker
              color={backgroundColor}
              onChange={(newColor) => {
                setBackgroundColor(newColor);
                handleStyleChange("backgroundColor", newColor);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
