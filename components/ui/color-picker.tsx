"use client";

import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { HexColorPicker } from "react-colorful";
import { useCallback } from "react";

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
}

const isValidHexColor = (color: string) => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);

export function ColorPicker({ value, onChange }: ColorPickerProps) {
  const handleChange = useCallback(
    (newColor: string) => {
      // Ensure the color is a valid hex color
      if (isValidHexColor(newColor)) {
        onChange(newColor);
      }
    },
    [onChange]
  );

  // Ensure the initial value is a valid hex color
  const displayValue = isValidHexColor(value) ? value : "#000000";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start text-left font-normal">
          <div
            className="mr-2 h-4 w-4 rounded"
            style={{
              backgroundColor: displayValue,
              border: "1px solid rgba(0,0,0,0.1)"
            }}
          />
          {displayValue.toUpperCase()}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[240px] p-3" sideOffset={5} align="start">
        <div className="space-y-2">
          <HexColorPicker color={displayValue} onChange={handleChange} />
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Hex Color</span>
            <span>{displayValue.toUpperCase()}</span>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
